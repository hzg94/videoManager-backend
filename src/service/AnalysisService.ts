import {Inject, Service} from "typedi";
import {AiService} from "./AiService";
import {FileService} from "./FileService";


@Service()
export class AnalysisService {

    @Inject()
    aiService: AiService

    @Inject()
    fileService: FileService

    constructor() {

    }

    /**
     *
     * @param path 媒体库路径
     */
    async analysis(path: string){
        const dirs = await this.fileService.getDirs(path);
        for (const dir of dirs) {
            console.log(dir)
        }
    }



    analysisTitle(title: string, type: string){

    }

    analysisTitleForAi(title: string){

    }

    /**
     * filter
     */
    analysisTitleForLocal(title: string){

    }

    get_metadata(title: string, type: string){

    }



}