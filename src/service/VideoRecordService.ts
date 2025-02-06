import {Inject, Service} from "typedi";
import VideoRecord from "../entity/video/videoRecord";
import {VideoTypeEnum} from "@common/interface/entity/video";
import {BaseResponse} from "@common/resoponse";
import {TmdbService} from "./TmdbService";


@Service()
export class VideoRecordService {

    @Inject()
    tmdbService: TmdbService


    public async getLocalVideoList () {
        return BaseResponse.Success(await VideoRecord.find())
    }


    public async addTVRecord (title: string){

    }

    public async addVideoRecord(title: string, type: VideoTypeEnum){
        return this.tmdbService.getTmdbData('2.5次元的诱惑')

    }

    public async findOneVideoRecord (filter: Partial<VideoRecord>){
        return (await VideoRecord.find({
            ...filter,
            take: 1,
        }))[0]
    }

    public async addLocalVideoRecordForTv (VideoFolderPath: string): Promise<any> {
        return await VideoRecord.insert({
            title: '2.5次元的诱惑',
            type: VideoTypeEnum.Tv,
            backdropPicPath: '',
            posterPicPath: '',
            description: '',
            credits:[],
            path: VideoFolderPath,
            link:[],
            metaData: {}
        })
    }
}