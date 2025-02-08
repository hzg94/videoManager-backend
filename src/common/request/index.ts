import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {runtime} from "webpack";

// 定义请求配置接口
interface RequestConfig extends AxiosRequestConfig {
    // 可以在这里扩展自定义配置
}

// 定义响应数据接口
interface ResponseData<T = any> {
    code: number;
    message: string;
    data: T;
}

class Request {
    private instance: AxiosInstance;

    constructor(config: RequestConfig) {
        this.instance = axios.create(config);

        // 请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                // 在发送请求之前做些什么
                // 例如：添加 token
                // const token = localStorage.getItem('token');
                // if (token) {
                //     config.headers['Authorization'] = `Bearer ${token}`;
                // }
                return config;
            },
            (error) => {
                // 对请求错误做些什么
                return Promise.reject(error);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response:any) => {
                return response.data;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // 封装 GET 请求
    public async get<T = any>(url: string, config?: RequestConfig) {
        const response = await this.instance.get<ResponseData<T>>(url, config);
        return response; // 返回解构后的 data 字段
    }

    // 封装 POST 请求
    public async post<T = any>(url: string, data?: any, config?: RequestConfig) {
        const response = await this.instance.post<ResponseData<T>>(url, data, config);

        return response; // 返回解构后的 data 字段
    }

    // 封装 PUT 请求
    public async put<T = any>(url: string, data?: any, config?: RequestConfig) {
        const response = await this.instance.put<ResponseData<T>>(url, data, config);
        return response; // 返回解构后的 data 字段
    }

    // 封装 DELETE 请求
    public async delete<T = any>(url: string, config?: RequestConfig) {
        const response = await this.instance.delete<ResponseData<T>>(url, config);
        return response; // 返回解构后的 data 字段
    }
}

// 导出类而不是实例
export { Request };
