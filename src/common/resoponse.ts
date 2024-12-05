import {BaseResponseType} from "@common/interface";

export class BaseResponse<T> implements BaseResponseType<T> {
    code: number;
    data: T;
    success: boolean;
    message: string

    constructor(code: number, success: boolean, data: T, message: string) {
        this.code = code
        this.success = success
        this.data = data
        this.message = message
    }

    static Success<T>(data: T) {
        return new BaseResponse<T>(200, true, data, "Ok")
    }

    static Failed(message: string, code: number) {
        return new BaseResponse<void>(code, false, void 0, message)
    }


}