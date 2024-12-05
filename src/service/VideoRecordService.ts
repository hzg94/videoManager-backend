import {Inject, Service} from "typedi";
import VideoRecord from "../entity/videoRecord";
import {VideoTypeEnum} from "@common/interface/entity/video";
import {BaseResponse} from "@common/resoponse";
import {PluginsService} from "./PluginsService";
import {AbilityType} from "@common/interface/service/plugins";
import {MetaDataAbility} from "@common/interface/ability/abilityInterface";


@Service()
export class VideoRecordService {

    @Inject()
    pluginsService: PluginsService

    public async getLocalVideoList () {
        return BaseResponse.Success(await VideoRecord.find())
    }


    public async addTVRecord (title: string){
        let ability = this.pluginsService.getAbility<MetaDataAbility>(AbilityType.MetaInfo);
        ability.forEach(x => {

            console.log(x.getMetaData(title, VideoTypeEnum.Tv))
        })
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



    // parse
    public async parseTitle(fileName: string) {

        return ""
    }
}