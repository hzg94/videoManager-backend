import {Body, Get, JsonController, Post, QueryParam, QueryParams} from 'routing-controllers'
import {Inject, Service} from "typedi";
import {VideoRecordService} from "../service/VideoRecordService";
import {VideoTypeEnum} from "@common/interface/entity/video";
import VideoRecord from "../entity/video/videoRecord";

@Service()
@JsonController('/video')
export class VideoRecordController {

  @Inject()
  videoRecordService: VideoRecordService

  @Get('/list')
  async list (@QueryParams() query: string): Promise<any> {
    return await this.videoRecordService.getLocalVideoList()
  }

  @Post('/find')
  async findOneVideo (@Body() body: VideoRecord): Promise<any> {
    return await this.videoRecordService.findOneVideoRecord(body)
  }

  @Post('/import')
  async importVideo (@Body() body: any): Promise<any> {
    return await this.videoRecordService.addLocalVideoRecordForTv(body.path)
  }

  @Get('/test')
  async test (): Promise<any> {
    return await this.videoRecordService.addVideoRecord('2.5次元的诱惑', VideoTypeEnum.Tv);
  }

  @Get("/AddTVRecord")
  async addTVRecord(@QueryParam('title',{required: true}) title: string): Promise<any> {
    return await this.videoRecordService.addTVRecord(title)
  }
}
