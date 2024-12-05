import 'reflect-metadata'
import Koa from 'koa'
import KoaSession from 'koa-session'
import KoaParameter from 'koa-parameter'
import {koaBody} from 'koa-body'
import {useContainer, useKoaServer} from 'routing-controllers'
import {VideoRecordController} from './controllers/videoRecordController'
import {UseLogWare} from './middleware'
import AppDataSource from './entity'
import {Container} from "typedi";
import {ConfigService} from "./service/ConfigService";
import {PluginsService} from "./service/PluginsService";
import {PluginsController} from "./controllers/pluginsController";
import {FileController} from "./controllers/FileController";


(async () => {
    const app: Koa = new Koa()

    // get instance of config service
    const configService = Container.get(ConfigService)

    const config = await configService.loadConfig()

    app.keys = ['session base secret']

    app.use(koaBody())
    app.use(KoaParameter(app) as Koa.Middleware)
    app.use(KoaSession(config.session, app))

    useContainer(Container)

    useKoaServer(app, {
        controllers: [VideoRecordController, PluginsController,FileController],
        middlewares: [UseLogWare],
        routePrefix: '/api'
    })

    app.listen(config.port)

    console.log('Service Started Successfully')

    await AppDataSource.initialize()

    await PluginsService.loadPlugins(config.loadPlugins)
})()

