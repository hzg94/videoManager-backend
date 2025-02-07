import {Service} from "typedi";


@Service()
export class AiService {


    TalkDeepseek(title: string) {
        return title
    }

    TalkOpenAi(title: string) {
        return "hello"
    }

}