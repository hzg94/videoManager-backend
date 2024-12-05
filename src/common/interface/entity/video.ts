export enum VideoTypeEnum {
    Tv = 'tv',
    Movie = 'movie',
    Unknown = 'unknown'
}

// 外链
export type VideoLinkType = {
    //平台
    name: string
    // url
    url: string
}

export type CreditsType = {
    name: string
    role: string
}

//元数据
export type MetaDataType = {
    date: Date


    // 外部平台id
    imdbId: string
    tvdbId: string
    tmdbId: string
    doubanId: string

} & Record<string, string>


export type VideoData = {
    id: string
    title: string
    type: VideoTypeEnum
    backdropPicPath: string
    posterPicPath: string
    description: string
    credits: CreditsType[]
    path: string
    link: VideoLinkType[]
    metaData: MetaDataType
}