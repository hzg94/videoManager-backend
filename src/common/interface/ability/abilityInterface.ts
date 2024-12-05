import {VideoTypeEnum} from "@common/interface/entity/video";

export interface BasePluginType {
    init(): void
    destroy(): void
}

export interface MetaDataAbility extends BasePluginType{
    getMetaData: (title: string,type: VideoTypeEnum) => Promise<void>
}