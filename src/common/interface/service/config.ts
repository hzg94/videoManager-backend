export interface CoreConfig<P extends Object> {
    port: number

    session: SessionConfig

    // 默认加载扩展路径
    loadPlugins: string[]
    pluginsConfig: P[]
}

export interface SessionConfig {
    key: string
    maxAge:number
    httpOnly: boolean
    signed: boolean
    rolling: boolean
    renew: boolean
}