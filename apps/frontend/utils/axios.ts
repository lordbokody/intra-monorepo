import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://staging-mke-intra-amf2.encr.app",
    //baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
    },
});

type AxiosMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface AxiosParams<T = any> {
    method: AxiosMethod;
    route: string;
    data?: T;
    token?: string;
    params?: never;
}

export const axiosRequest = async <T>({ method, route, data, token, params }: AxiosParams): Promise<T> => {

    const headers = {
        ...axiosInstance.defaults.headers.common,
        'Accept-Language': 'hu',
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
