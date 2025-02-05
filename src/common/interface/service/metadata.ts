import {MetaDataResult, VideoTypeEnum} from "@common/interface/entity/video";

export interface MetaDataService {
    getMetaData(title: string, type: VideoTypeEnum): Promise<MetaDataResult>;
}