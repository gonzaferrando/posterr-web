import {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject({status: error.response?.status, message: error.response?.data });
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.log(" RESPONSE ", response)
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject({status: error.response?.status, message: error.response?.data });
}

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

export default setupInterceptorsTo;