import {Body, Get, JsonController, Post, QueryParam, QueryParams} from 'routing-controllers'
import {Inject, Service} from "typedi";
import {VideoRecordService} from "../service/VideoRecordService";

@Service()
@JsonController('/video')
export class VideoRecordController {

  @Inject()
  videoRecordService: VideoRecordService

  @Get('/list')
  async list (@QueryParams() query: string): Promise<any> {
    return await this.videoRecordService.getLocalVideoList()
  }

  @Get('/test')
  async test (): Promise<any> {
    return await this.videoRecordService.addLocalVideoRecordForTv('test/2.5次元的诱惑 (2024)')
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
