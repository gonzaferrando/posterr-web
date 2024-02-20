
import { AxiosResponse } from 'axios';
import http  from './config/AxiosSetup';
import QueryString from "query-string";

export default class Api {
  static async get<T>(uri: string, params?: unknown): Promise<AxiosResponse<T, T>> {
    return await http.get<T>(uri, { params, paramsSerializer: p => QueryString.stringify(p) }).catch(error => { console.log(error); throw error });
  }  

  static async post<T>(uri: string, body: T) {
    return await http.post(uri, body).catch(error => { console.log(error); throw error });
  }

}