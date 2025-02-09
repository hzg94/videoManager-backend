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
    // 外部平台id
    imdbId: string
    tvdbId: string
    tmdbId: string
    doubanId: string

} & Record<string, string>


export type VideoData = {
  title: string;
  type: VideoTypeEnum;
  /** 指向cacheId*/
  backdropPicPath: string;
  /**指向cacheId */
  posterPicPath: string;

  description: string;
  credits: CreditsType[];
  path: string;
  link: VideoLinkType[];
  metaData?: MetaDataType;
  seasons: Seasons[];
};

export type Seasons = {

    number: string

    title: string

    year: string

    description: string
    // 总集数
    total: string

    episodes: EpisodeData[]
}

export type EpisodeData = {

    // 集数
    number: string

    title: string

    description: string

    // 时长 unit 分钟
    time: number

    // 指向cacheId
    backdropPicPath: string

}

export interface MetaDataResult {
    title: string

}


