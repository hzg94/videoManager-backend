import {Container, Service} from "typedi";
import * as crypto from 'crypto';
import VideoRecord from "@/entity/video/videoRecord";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";
import {ConfigService} from "@/service/ConfigService";
import * as path from "node:path";
import fs from "fs";
import { ReadStream } from "node:fs";
import { PassThrough } from "node:stream";


@Service()
export class CacheService {
    tempDir: string

    constructor() {
        const config = Container.get(ConfigService)
        this.tempDir = config.getConfig('tempDir') as string
    }

    /**
     * TODO: bug 无法使用axios流
     * @param stream 可读流
     * @return Promise<string> cacheId
     */
    async saveCache(stream: ReadStream): Promise<string> {
        //数据分发
        const passThrough1 = new PassThrough();
        const passThrough2 = new PassThrough();

        stream.pipe(passThrough1);
        stream.pipe(passThrough2);

        const hash = crypto.createHash('md5');

        //计算md5
        const md5 = await new Promise<string>((resolve, reject) => {
            passThrough1.on('data', chunk => {
                //@ts-ignore
                hash.update(chunk, 'utf8');
            });

            passThrough1.on('end', () => {
                resolve(hash.digest('hex'))
            });

            passThrough1.on('error', (err) => reject(err))
        })

        const writeStream = fs.createWriteStream(path.resolve(this.tempDir, md5))
        //写入文件
        passThrough2.pipe(writeStream)

        return md5
    }

    async deleteCache(cacheId: string) {

    }

    /**
     * 查找本地所有缓存
     */
    findCacheForAll(cacheId: string) {



    }

    /**
     * 查找有效所有缓存
     */
    async findCacheForUsed(){
        const cacheSet = new Set<string>()

        const video = await VideoRecord.find({
            select: ['backdropPicPath','posterPicPath'],
        })

        const second = await EpisodeRecord.find({
            select: ['backdropPicPath']
        })

        video.forEach(item => {
            cacheSet.add(item.backdropPicPath)
            cacheSet.add(item.posterPicPath)
        })

        second.forEach(item => {
            cacheSet.add(item.backdropPicPath)
        })

        return cacheSet
    }

    async cleanCache() {

    }


}