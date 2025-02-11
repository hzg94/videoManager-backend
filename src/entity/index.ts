import {DataSource} from 'typeorm'
import VideoRecord from "./video/videoRecord";
import {SeasonsRecord} from "@/entity/video/SeasonsRecord";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";
import {CacheRecord} from "@/entity/cache/CacheRecord";


const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/database/data.db',
    synchronize: true,
    logging: false,
    entities: [VideoRecord,SeasonsRecord,EpisodeRecord,CacheRecord],
    subscribers: [],
    migrations: []
})

export default AppDataSource
