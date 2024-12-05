import {Service} from "typedi";
import VideoRecord from "../entity/videoRecord";
import {MetaDataType, VideoData, VideoTypeEnum} from "@common/interface/entity/video";


@Service()
export class MetaDataService {

    async getMetaData(title: string){
        return await VideoRecord.findOne({
            where: {
                title: title
            }
        })
    }

    async setMetaData(title: string, data: VideoData){
        return await VideoRecord.update(data,{title: title})
    }

    async parseMetaData(data: any){

    }
}