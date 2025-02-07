import {Service} from "typedi";
import {DownloadTask} from "@common/interface/service/download";

// TODO: 未完成 support qb and aria2 ？
// bt or other
@Service()
export class DownloadService {

    private static instance: DownloadService;

    async addDownload(task: DownloadTask): Promise<string> {

        return ""
    }

    async getDownloadTaskList(): Promise<DownloadTask[]> {

        return []
    }

    async pauseDownloadTask(taskKey: string): Promise<boolean> {
        return true
    }

    async resumeDownloadTask(taskKey: string): Promise<boolean> {
        return true
    }

    async cancelDownloadTask(taskKey: string, removeFile: boolean): Promise<boolean> {
        return true
    }

}