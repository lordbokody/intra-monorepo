import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {ApplicationLanguage} from "@intra/shared/types/common.types";

// Létrehozzuk az axios példányát
const axiosInstance: AxiosInstance = axios.create({
    //baseURL: "https://staging-mke-intra-amf2.encr.app",
    baseURL: "http://127.0.0.1:4000",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Beállítjuk a támogatott metódusokat
export type AxiosMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// Interface az axios bemeneti paramétereire
interface AxiosParams<T = any> {
    method: AxiosMethod;
    route: string;
    data?: T;
    token?: string;
    params?: never;
    language?: ApplicationLanguage
}

// Axios kliens meghívására szolgáló függvény
export const axiosRequest = async <T>({ method, route, data, token, params, language }: AxiosParams): Promise<T> => {
    // Beállítjuk a headereket
    const headers = {
        ...axiosInstance.defaults.headers.common,
        'Accept-Language': language || 'hu',
        'Authorization': token || '',
    };

    // Konfiguráljuk a hívást
    const config: AxiosRequestConfig = {
        method,
        url: route,
        data,
        params,
        headers
    };

    // Meghívjuk a szervert
    const response = await axiosInstance(config);

    // Visszatérünk a szervertől kapott adatokkal
    return response.data;
};