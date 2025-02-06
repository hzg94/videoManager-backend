import {Service} from "typedi";
import {CoreConfig} from "@common/interface/service/config";
import {ReadJsonFile, WriteJsonFile} from "@common/file";
import * as path from 'path'
import logger from "@common/logger";


@Service()
export class ConfigService {

    coreConfigPath = path.resolve("data", "config.json")

    coreConfig = {} as CoreConfig<any>

    async loadConfig<T extends Object>(): Promise<CoreConfig<T>> {
        logger.debug("loadConfig ....")

        const coreConfig = await ReadJsonFile<CoreConfig<T>>(this.coreConfigPath)

        this.coreConfig = coreConfig ?? await this.initConfig()

        return this.coreConfig;
    }

    getConfig(configKey: string) {
        return this.coreConfig[configKey]
    }

    getKey(platform: string){
        return this.coreConfig.key[platform]
    }

    async initConfig<T extends Object>() {
        logger.debug("initConfig ....")

        const initCoreConfig = {
            port: 3000,
            session: {
                key: 'test',
                maxAge: 4 * 60 * 60 * 1000,
                httpOnly: true,
                signed: true,
                rolling: true,
                renew: false
            },
            loadPlugins: [],
            pluginsConfig: [],
            key: {}
        } as CoreConfig<T>

        await WriteJsonFile(this.coreConfigPath, initCoreConfig)

        return initCoreConfig
    }


}