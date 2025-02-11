import {Inject, Service} from "typedi";
import {ConfigService} from "@/service/ConfigService";


@Service()
export class AiService {

    @Inject()
    configService: ConfigService

    // 提示词
    Prompt = `
        
    `


    TalkDeepseek(title: string) {
        return title
    }

    TalkOpenAi(title: string) {
        return "hello"
    }

}