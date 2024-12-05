
//
export enum DownloadMethodsType {
    Magnet,
    Http
}

export enum DownloadTaskStatusType {
    Start,
    Stop,
    Pause,
    // only bt task
    Seed
}


export interface DownloadTask {
    // 下载地址
    url: string,
    // 下载类型
    type: DownloadMethodsType,
    // 下载分类
    class: string
    // 下载位置
    path: string
    // 当前状态
    status?: DownloadTaskStatusType
    // 当前进度
    process: number
    // 任务key
    key: string
}