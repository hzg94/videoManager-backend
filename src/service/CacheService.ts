import {Container, Service} from "typedi";
import * as crypto from 'crypto';
import VideoRecord from "@/entity/video/videoRecord";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";
import {ConfigService} from "@/service/ConfigService";
import fs from "fs/promises";
import * as path from "node:path";


@Service()
export class CacheService {
    tempDir: string

    constructor() {
        const config = Container.get(ConfigService)
        this.tempDir = config.getConfig('tempDir') as string
    }

    async getCache(cacheId: string,type: string): Promise<ArrayBufferLike> {
        const buffer = await fs.readFile(path.resolve(this.tempDir, `${cacheId}.${type}`))
        return buffer.buffer
    }

    /**
     * @return Promise<string> cacheId
     * @param buf
     */
    async saveCache(buf: ArrayBuffer, type: string): Promise<string> {
        //计算md5
        const hash = crypto.createHash('md5');
        const buffer = Buffer.from(buf);
        hash.update(buffer);
        const md5Hash = hash.digest('hex');
        //写入文件
        await fs.writeFile(path.resolve(this.tempDir, `${md5Hash}.${type}`), buffer)
        return md5Hash
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