import {Container, Service} from "typedi";
import {ConfigService} from "./ConfigService";
import MovieDB from "node-themoviedb";
import {EpisodeData, VideoData, VideoTypeEnum, Seasons} from "@common/interface/entity/video";


@Service()
export class TmdbService {
    configService: ConfigService

    client: MovieDB

    constructor() {
        this.configService = Container.get(ConfigService)
        this.client = new MovieDB(this.configService.getKey('tmdb'), {
            language: 'zh-CN'
        })
    }

    async getEpisodes(id: number, season_number: number){
        let episodes:EpisodeData[] = []

        let SeasonRes = (await this.client.tv.season.getDetails({
            pathParameters: {
                tv_id: id,
                season_number: season_number
            }}
        ))['data']

        SeasonRes.episodes.forEach(episode => {
            episodes.push({
                id: 0,
                // 集数
                number: episode.episode_number + '',

                title: episode.name,

                description: episode.overview,

                // 时长 unit 分钟
                time: episode['runtime'],

                backdropPicPath: '',
            })
        })
        return episodes
    }


    async getSeasons(id: number){

        let seasonsData: Seasons[] = []

        let DetailRes = (await this.client.tv.getDetails({
            pathParameters: {
                tv_id: id
            }
        }))['data']

        for (let i = 0; i < DetailRes['seasons'].length; i++) {
            let episodes = await this.getEpisodes(id, DetailRes['seasons'][i]['season_number'])

            const season = DetailRes['seasons'][i]

            seasonsData.push({
                id: 0,
                number: season['season_number'] + '',
                title: season['name'],
                year: season['air_date'],
                description: season['overview'],
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

        let seasonsData = await this.getSeasons(searchRes['id'])

        console.log(searchRes)

        return {
            backdropPicPath: "",
            credits: [],
            description: searchRes['overview'],
            id: 0,
            link: [
                {
                    name: 'tmdb',
                    url: `https://www.themoviedb.org/tv/${searchRes['id']}`
                }
            ],
            metaData: {
                date: searchRes['first_air_date'],
                imdbId: '',
                tvdbId: '',
                tmdbId: searchRes['id'] + '',
                doubanId: ''
            },
            path: "",
            posterPicPath: "",
            seasons: seasonsData,
            title: searchRes['name'],
            type: VideoTypeEnum.Tv
        }

    }

}