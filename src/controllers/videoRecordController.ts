import {Body, Get, JsonController, Post, QueryParam, QueryParams} from 'routing-controllers'
import {Inject, Service} from "typedi";
import {VideoRecordService} from "../service/VideoRecordService";
import {TmdbService} from "../service/metadata/TmdbService";
import {VideoTypeEnum} from "@common/interface/entity/video";

@Service()
@JsonController('/video')
export class VideoRecordController {

  @Inject()
  videoRecordService: VideoRecordService

  @Inject()
  Tmdbseervice: TmdbService

  @Get('/list')
  async list (@QueryParams() query: string): Promise<any> {
    return await this.videoRecordService.getLocalVideoList()
  }

  @Post('/import')
  async importVideo (@Body() body: any): Promise<any> {
    return await this.videoRecordService.addLocalVideoRecordForTv(body.path)
  }

  @Get('/test')
  async test (): Promise<any> {
    return await this.videoRecordService.addVideoRecord(this.Tmdbseervice, '2.5次元的诱惑', VideoTypeEnum.Tv);
  }

  @Get("/AddTVRecord")
  async addTVRecord(@QueryParam('title',{required: true}) title: string): Promise<any> {
    return await this.videoRecordService.addTVRecord(title)
  }

  @Post('/post')
  async post (@Body() body: any): Promise<any> {
    console.log(body, '请求的body参数')
    return {}
  }



}
