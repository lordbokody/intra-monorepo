import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://staging-mke-intra-amf2.encr.app",
    //baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
    },
});

export type AxiosMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface AxiosParams<T = any> {
    method: AxiosMethod;
    route: string;
    data?: T;
    token?: string;
    params?: never;
    language?: ApplicationLanguage
}

export const axiosRequest = async <T>({ method, route, data, token, params, language }: AxiosParams): Promise<T> => {

    const headers = {
        ...axiosInstance.defaults.headers.common,
        'Accept-Language': language || 'hu',
        'Authorization': token || '',
    };

    const config: AxiosRequestConfig = {
        method,
        url: route,
        data,
        params,
        headers
    };

    const response = await axiosInstance(config);
    return response.data;
};