import {Inject, Service} from "typedi";
import {AbilityType, PluginConfig, Plugins} from "@common/interface/service/plugins";
import {ReadJsonFile} from "@common/file";
import * as path from 'path'
import {ConfigService} from "./ConfigService";
import logger from "@common/logger";

@Service()
export class PluginsService {

    @Inject()
    configService: ConfigService

    static pluginsList: Plugins[] = []

    static async loadPlugins(pluginsPath: string[]) {
        for (let i = 0; i < pluginsPath.length; i++) {
            await PluginsService.loadPlugin(pluginsPath[i])
        }
    }

    static async loadPlugin(pluginPath: string){
        const pluginsConfig = await this.loadPluginsConfig(pluginPath)
        const pluginsEntryPath = path.resolve(pluginPath, pluginsConfig.entry)
        const plugin = await import(pluginsEntryPath)

        PluginsService.pluginsList.push({
            ability: pluginsConfig.ability,
            key: pluginsConfig.name,
            module: plugin,
            config: pluginsConfig
        })

        logger.info(`load plugin ${pluginsConfig.name} success`)
    }

    getAbility<T>(abilityName: AbilityType): T[]{
        return PluginsService.pluginsList.filter(x => {
            return x.ability.includes(abilityName);
        }).map(x => x.module) as T[]
    }

    static async loadPluginsConfig(pluginPath: string): Promise<PluginConfig> {
        const pluginsConfigPath = path.resolve(pluginPath, 'config.json')
        return await ReadJsonFile(pluginsConfigPath) as PluginConfig
    }


    async addLocalPlugin(pluginPath: string) {
        await this.configService.addLocalPlugins([pluginPath])
    }
}