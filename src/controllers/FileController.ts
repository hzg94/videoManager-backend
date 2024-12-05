import {Get, Header, JsonController, Param, QueryParam} from "routing-controllers";
import {Inject, Service} from "typedi";
import {FileService} from "../service/FileService";
import {BaseResponse} from "@common/resoponse";


@JsonController("/file")
@Service()
export class FileController {

    @Inject()
    fileService: FileService

    @Get('/ls')
    async list(@QueryParam('path',{required: true}) path: string) {
        try{
            const data = await this.fileService.getFileList(path)
            return BaseResponse.Success(data)
        }catch (error){
            return BaseResponse.Failed(error.message, 500)
        }
    }

    @Get("/getPic")
    @Header('content-type', 'image/jpeg')
    async getPic(@QueryParam('path',{required: true}) path: string){
        return await this.fileService.getPic(path)
    }
}