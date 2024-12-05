import * as fs from 'fs/promises'


export const ReadJsonFile = async <T>(filePath: string): Promise<T | null> => {
    return await new Promise((resolve, reject) => {
        return fs.readFile(filePath).then(x => {
            return resolve(JSON.parse(x.toString()) as T)
        }).catch(() => {
            reject(null)
        })
    })
}

export const WriteJsonFile = async (filePath: string, data: any) => {
    return await fs.writeFile(filePath, JSON.stringify(data))
}