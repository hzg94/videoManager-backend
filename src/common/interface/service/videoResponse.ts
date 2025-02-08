import {VideoTypeEnum} from "@common/interface/entity/video";

export interface VideoResponse{
    title: string,
    douBan_target_id:string,
    video_type:VideoTypeEnum,
    cover_url:string,
    year:number,
    card_subtitle:string,
}

export class DoubanVideo implements VideoResponse{
    title: string;
    douBan_target_id: string;
    video_type: VideoTypeEnum;
    cover_url: string;
    year: number;
    card_subtitle: string;

    constructor(title: string, douBan_target_id: string, video_type: VideoTypeEnum, cover_url: string, year: number, card_subtitle: string) {
        this.title = title;
        this.douBan_target_id = douBan_target_id;
        this.video_type = video_type;
        this.cover_url = cover_url;
        this.year = year;
        this.card_subtitle = card_subtitle;
    }
}

export class DobanMovieSearchResponse{
    count: number
    start: number
    banned: string
    total: number
    items:DoubanVideoResponse[]
}

export class DoubanVideoResponse {
    layout: string
    type_name: string
    target_id: string
    target: {
        rating: {
            count: number,
            max: number,
            star_count: number,
            value: number,
        },
        controversy_reason: string,
        title: string,
        abstract: string,
        has_linewatch: true,
        uri: string,
        cover_url: string,
        year: string,
        card_subtitle: string,
        id: string,
        null_rating_reason: string,
    }
    target_type: string
    public toDoubanVideo():DoubanVideo{
        console.log("?")
        let values:string[] = Object.values(VideoTypeEnum);
        let tmp_type=VideoTypeEnum.Unknown

        if (values.includes(this.target_type)){
            tmp_type = this.target_type as VideoTypeEnum;
        }

        return new DoubanVideo(this.target.title,this.target_id,tmp_type,this.target.cover_url,parseInt(this.target.year),this.target.card_subtitle)
    }
}
