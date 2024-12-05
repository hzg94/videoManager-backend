export interface Plugins {
    key: string,

    module: any,

    config: PluginConfig,

    ability: AbilityType[],
}

export enum AbilityType {
    DownloadManager = 'downloadManager',
    MetaInfo = 'metaInfo',
}

export interface PluginConfig {
    name: string,
    version: string,
    desc: string,
    ability: AbilityType[],
    entry: "index.ts"
}