import {Inject, Service} from "typedi";
import {Get, JsonController, QueryParam} from "routing-controllers";
import {PluginsService} from "../service/PluginsService";


@Service()
@JsonController('/plugins')
export class PluginsController {

    @Inject()
    pluginService: PluginsService

    @Get('/loadLocalPlugin')
    async list (@QueryParam('path',{required: true}) path: string): Promise<any> {
        await this.pluginService.addLocalPlugin(path)
        return {status: 'success'}
    }



}
