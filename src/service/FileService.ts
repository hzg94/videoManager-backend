import fs from 'fs/promises'
import {Service} from "typedi";
import {FileType} from "@common/interface/service/file";
import * as path from "node:path";

@Service()
export class FileService {
    public async getFileList(filePath: string): Promise<FileType[]> {
        const list = await fs.readdir(filePath)

        return await Promise.all(list.map(async (value) => {

            const stat = await fs.lstat(path.resolve(filePath, value))

            return {
                name: value,
                isDir: stat.isDirectory(),
                path: path.resolve(filePath, value),
                createTime: stat.birthtime
            }
        }))

    }

    async getPic(filePath: string){
        return await fs.readFile(filePath)
    }


}