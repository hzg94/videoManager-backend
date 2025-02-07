import {Inject, Service} from "typedi";
import * as path from "node:path";
import fs from "fs";
import * as crypto from 'crypto';
import VideoRecord from "@/entity/video/videoRecord";
import {EpisodeRecord} from "@/entity/video/EpisodeRecord";
import {ConfigService} from "@/service/ConfigService";

@Service()
export class CacheService {

    @Inject()
    configService: ConfigService

    /**
     * @param href 网址
     * @return Promise<string> cacheId
     */
    async saveCache(href: string): Promise<string> {
        const stream = fs.createReadStream(path.join(__dirname, '1.mp4'));

        const hash = crypto.createHash('md5');

        return await new Promise<string>((resolve, reject) => {
            stream.on('data', chunk => {
                //@ts-ignore
                hash.update(chunk, 'utf8');
            });

            stream.on('end', () => {
                resolve(hash.digest('hex'))
            });

            stream.on('error', (err) => reject(err))
        })
    }

    async deleteCache(cacheId: string) {

    }

    /**
     * 查找本地所有缓存
     */
    findCacheForAll(cacheId: string) {
        const tempDir = this.configService.getConfig('tempDir');


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