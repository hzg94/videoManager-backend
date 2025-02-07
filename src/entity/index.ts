import {DataSource} from 'typeorm'
import VideoRecord from "./video/videoRecord";
import {SeasonsRecord} from "@/entity/video/SeasonsRecord";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";


const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/database/data.db',
    synchronize: true,
    logging: false,
    entities: [VideoRecord,SeasonsRecord,EpisodeRecord],
    subscribers: [],
    migrations: []
})

export default AppDataSource
