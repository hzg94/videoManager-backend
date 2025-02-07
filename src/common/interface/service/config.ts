export type CoreConfig <P extends Object, T extends Record<string, any> = {}> =  {
    port: number

    session: SessionConfig

    // 默认加载扩展路径
    loadPlugins: string[]
    pluginsConfig: P[]

    tempDir: string

    key: Record<string, string>
} & T

export interface SessionConfig {
    key: string
    maxAge:number
    httpOnly: boolean
    signed: boolean
    rolling: boolean
    renew: boolean
}