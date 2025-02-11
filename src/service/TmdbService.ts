import {Container, Inject, Service} from "typedi";
import {ConfigService} from "./ConfigService";
import MovieDB from "node-themoviedb";
import {EpisodeData, Seasons, VideoData, VideoTypeEnum} from "@common/interface/entity/video";
import {CacheService} from "@/service/CacheService";
import axios from "axios";


@Service()
export class TmdbService {
    configService: ConfigService

    @Inject()
    cacheService: CacheService

    client: MovieDB

    basePicUrl = 'https://image.tmdb.org/t/p/original/'

    constructor() {
        this.configService = Container.get(ConfigService)
        this.client = new MovieDB(this.configService.getKey('tmdb'), {
            language: 'zh-CN'
        })
    }

    async getTmdbPic(url: string | null) {
        if (!url) {
            return ''
        }

        const picUrl = this.basePicUrl + url

        const picType = picUrl.split('.').pop() ?? ''

        const pic = await axios.get(picUrl,
            {
                responseType: 'arraybuffer'
            })

        /*      if (pic.status !== 200) {
                  throw new Error('获取图片失败')
              }*/

        return await this.cacheService.saveCache(pic.data, picType)
    }

    async getEpisodes(id: number, season_number: number) {
        let episodes: EpisodeData[] = []

        let SeasonRes = (await this.client.tv.season.getDetails({
                pathParameters: {
                    tv_id: id,
                    season_number: season_number
                }
            }
        ))['data']

        for (const episode of SeasonRes.episodes) {
            const backdropPic = await this.getTmdbPic(episode.still_path)

            episodes.push({
                // 集数
                number: episode.episode_number + '',

                title: episode.name,

                description: episode.overview,

                // 时长 unit 分钟
                time: episode['runtime'],

                backdropPicPath: backdropPic,
            })
        }

        return episodes
    }


    async getSeasons(id: number) {

        let seasonsData: Seasons[] = []

        let DetailRes = (await this.client.tv.getDetails({
            pathParameters: {
                tv_id: id
            }
        }))['data']


        for (let i = 0; i < DetailRes['seasons'].length; i++) {
            let episodes = await this.getEpisodes(id, DetailRes['seasons'][i]['season_number'])

            const season = DetailRes['seasons'][i]

            const posterPic = await this.getTmdbPic(season.poster_path)

            seasonsData.push({
                number: season['season_number'] + '',
                title: season['name'],
                year: season['air_date'] ?? '',
                description: season['overview'],

                posterPicPath: posterPic,
                // 总集数
                total: season['episode_count'] + '',
                episodes: episodes
            })

        }

        return seasonsData
    }

    async getTmdbData(title: string): Promise<VideoData> {
        let searchRes = (await this.client.search.multi({
            query: {
                query: title,
            }
        }))['data']['results'][0]

        switch (searchRes['media_type']) {
            case 'tv':
                return await this.getTVData(searchRes)
            default:
                throw new Error('暂不支持该类型')
        }

    }

    async getTVData(searchRes: MovieDB.Objects.TVShowWithMediaType) {
        let seasonsData = await this.getSeasons(searchRes['id'])

        const posterPic = await this.getTmdbPic(searchRes.poster_path)
        const backdropPic = await this.getTmdbPic(searchRes.backdrop_path)



        return {
            backdropPicPath: backdropPic,
            credits: [],
            description: searchRes['overview'],
            link: [
                {
                    name: 'tmdb',
                    url: `https://www.themoviedb.org/tv/${searchRes['id']}`
                }
            ],
            metaData: {
                imdbId: '',
                tvdbId: '',
                tmdbId: searchRes['id'] + '',
                doubanId: ''
            },
            path: "",
            posterPicPath: posterPic,
            seasons: seasonsData,
            title: searchRes['name'],
            type: VideoTypeEnum.Tv
        }
    }

}