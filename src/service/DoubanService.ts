import {Service} from "typedi";
import {ConfigService} from "./ConfigService";
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import {Request} from '@common/request';
import {DobanMovieSearchResponse, DoubanVideo} from "@common/interface/service/videoResponse";
import {CreditsType, VideoData, VideoTypeEnum} from "@common/interface/entity/video";

@Service()
export class DoubanService {

    private urls = {
        search: '/search/weixin',
        movie_search: '/search/movie',
        tv_search: '/search/movie',
        book_search: '/search/book',
        group_search: '/search/group',
        movie_showing: '/subject_collection/movie_showing/items',
        movie_soon: '/subject_collection/movie_soon/items',
        movie_hot_gaia: '/subject_collection/movie_hot_gaia/items',
        tv_hot: '/subject_collection/tv_hot/items',
        tv_animation: '/subject_collection/tv_animation/items',
        tv_variety_show: '/subject_collection/tv_variety_show/items',
        tv_rank_list: '/tv/rank_list',
        show_hot: '/subject_collection/show_hot/items',
        movie_top250: '/subject_collection/movie_top250/items',
        movie_recommend: '/movie/recommend',
        tv_recommend: '/tv/recommend',
        tv_chinese_best_weekly: '/subject_collection/tv_chinese_best_weekly/items',
        tv_global_best_weekly: '/subject_collection/tv_global_best_weekly/items',
        doulist: '/doulist/',
        doulist_items: '/doulist/%s/items',
        movie_detail: '/movie/',
        movie_celebrities: '/movie/%s/celebrities',
        tv_detail: '/tv/',
        tv_celebrities: '/tv/%s/celebrities',
        book_detail: '/book/',
        movie_recommendations: '/movie/%s/recommendations',
        tv_recommendations: '/tv/%s/recommendations',
        movie_photos: '/movie/%s/photos',
        tv_photos: '/tv/%s/photos',
        person_detail: '/elessar/subject/',
        person_work: '/elessar/work_collections/%s/works',
        imdbid: '/movie/imdb/%s',
    };
    private userAgents = [
        'api-client/1 com.douban.frodo/7.22.0.beta9(231) Android/23 product/Mate 40 vendor/HUAWEI model/Mate 40 brand/HUAWEI  rom/android  network/wifi  platform/AndroidPad',
        'api-client/1 com.douban.frodo/7.18.0(230) Android/22 product/MI 9 vendor/Xiaomi model/MI 9 brand/Android  rom/miui6  network/wifi  platform/mobile nd/1',
        'api-client/1 com.douban.frodo/7.1.0(205) Android/29 product/perseus vendor/Xiaomi model/Mi MIX 3  rom/miui6  network/wifi  platform/mobile nd/1',
        'api-client/1 com.douban.frodo/7.3.0(207) Android/22 product/MI 9 vendor/Xiaomi model/MI 9 brand/Android  rom/miui6  network/wifi platform/mobile nd/1',
    ];
    private configService: ConfigService
    private request: Request;
    private apiSecretKey = "bf7dddc7c9cfe6f7"
    private apiKey = "0dad551ec0f84ed02907ff5c42e8ec70"
    private apiKey2 = "0ab215a8b1977939201640fa14c66bab"
    private baseUrl = "https://frodo.douban.com/api/v2"
    private apiUrl = "https://api.douban.com/v2"



    constructor() {
        // this.configService = Container.get(ConfigService)
        this.request = new Request({
            baseURL: "https://www.doubanapi.com/v2"
        })
    }

    public toDoubanVideo(obj:any):DoubanVideo{
        let values:string[] = Object.values(VideoTypeEnum);
        let tmp_type=VideoTypeEnum.Unknown

        if (values.includes(obj.target_type)){
            tmp_type = obj.target_type as VideoTypeEnum;
        }

        return new DoubanVideo(obj.target.title,obj.target_id,tmp_type,obj.target.cover_url,parseInt(obj.target.year),obj.target.card_subtitle)
    }

    private sign(url: string, ts: string, method = 'GET'): string {
        const urlPath = new URL(url).pathname;
        const rawSign = `${method.toUpperCase()}&${encodeURIComponent(urlPath)}&${ts}`;
        return crypto
            .createHmac('sha1', this.apiSecretKey)
            .update(rawSign)
            .digest('base64');
    }

    private async invoke(
        url: string,
        method: 'GET' | 'POST' = 'GET',
        params: Record<string, any> = {}
    ): Promise<any> {
        const reqUrl = this.baseUrl + url;
        const ts = params['_ts'] || new Date().toISOString().split('T')[0].replace(/-/g, '');
        const finalParams = {
            ...params,
            os_rom: 'android',
            apiKey: this.apiKey,
            _ts: ts,
            _sig: this.sign(reqUrl, ts, method),
        };

        try {
            const response =
                method === 'GET'
                    ? await this.request.get(reqUrl, {
                        params: finalParams,
                        headers: {
                            "User-Agent":this.userAgents[Math.floor(Math.random()*this.userAgents.length)],
                        }
                    })
                    : await this.request.post(reqUrl, querystring.stringify(finalParams), {
                        headers: {
                            "User-Agent":this.userAgents[Math.floor(Math.random()*this.userAgents.length)],
                            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                        },
                    });
            return response;
        } catch (error) {
            console.error('API request failed:', error);
            return {};
        }
    }

    // public async search(keyword: string, start = 0, count = 20, ts?: string): Promise<any> {
    //     return this.invoke(this.urls.search, 'GET', { q: keyword, start, count, _ts: ts });
    // }

    public async movieSearch(keyword: string, start = 0, count = 1, ts?: string): Promise<DobanMovieSearchResponse> {
        return this.invoke(this.urls.movie_search, 'GET', { q: keyword, start, count, _ts: ts });
    }

    public async movieDetail(id:string): Promise<any> {
        return this.invoke(this.urls.movie_detail+id, 'GET');
    }

    public async movieCelebrities(id:string): Promise<any> {
        return this.invoke(this.urls.movie_celebrities.replace("%s",id), 'GET');
    }
    public async tvCelebrities(id: string): Promise<any> {
        return this.invoke(this.urls.tv_celebrities.replace("%s",id), 'GET');
    }
    // public async tvSearch(keyword: string, start = 0, count = 5, ts?: string): Promise<any> {
    //     return this.invoke(this.urls.tv_search, 'GET', { q: keyword, start, count, _ts: ts });
    // }

    public async tvDetail(id:string): Promise<any> {
        return this.invoke(this.urls.tv_detail+id, 'GET');
    }

    public async searchDetails(obj:DoubanVideo) {
        switch(obj.video_type){
            case VideoTypeEnum.Tv:
                return await this.tvDetail(obj.douBan_target_id);
            case VideoTypeEnum.Movie:
                return await this.movieDetail(obj.douBan_target_id);
        }
    }
    public async searchCelebrities(obj:DoubanVideo) {
        switch(obj.video_type){
            case VideoTypeEnum.Tv:
                return await this.tvCelebrities(obj.douBan_target_id);
            case VideoTypeEnum.Movie:
                return await this.movieCelebrities(obj.douBan_target_id);
        }
    }
    public async search(keyword):Promise<VideoData[]>{
        let tmp:DoubanVideo[] = []
        await this.movieSearch(keyword).then((res)=>{
            for (const item of res.items) {

                let doubanVideo = this.toDoubanVideo(item);
                tmp.push(doubanVideo);
            }
        }).catch((err)=>{
            console.log(err)
            return []
        })
        let result:VideoData[] = []
        let credits:CreditsType[] = []
        for (let video of tmp) {
            let detail =await this.searchDetails(video)
            var celebrities = await this.searchCelebrities(video);
            for (let director of celebrities.directors) {
                credits.push({
                    name: director.name,
                    pic: director.avatar.normal,
                    role: director.character
                });
            }
            let obj:VideoData = {
                backdropPicPath: "",
                credits: credits,
                description: detail.intro,
                link: [{
                    name: "Douban",
                    url: detail.url
                }],
                metaData: {
                    imdbId: '',
                    tvdbId: '',
                    tmdbId: '',
                    doubanId: detail.id,
                },
                path: "",
                posterPicPath: "",
                seasons: [],
                title: detail.title,
                // @ts-ignore
                type: video.video_type
            }
            result.push(obj)
        }

        return result
    }
}
