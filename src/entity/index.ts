import {DataSource} from 'typeorm'
import VideoRecord from "./video/videoRecord";


const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/database/data.db',
    synchronize: true,
    logging: false,
    entities: [VideoRecord],
    subscribers: [],
    migrations: []
})

export default AppDataSource
