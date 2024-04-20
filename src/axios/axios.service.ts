import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  async axiosGet<T>(baseURL: string, headers?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(baseURL, {
      headers,
    });
    return response.data;
  }

  async axiosPost<T>(baseURL: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      baseURL,
      data,
    );
    return response.data;
  }

  async axiosPatch<T>(baseURL: string, data: any, headers?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      baseURL,
      data,
      { headers },
    );
    return response.data;
  }

  async axiosDelete<T>(baseURL: string, headers?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      baseURL,
      {
        headers,
      },
    );
    return response.data;
  }

  async retryAxiosGet<T>(url: string, maxRetries = 3): Promise<T> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const response = await this.axiosGet<T>(url);
        return response;
      } catch (error) {
        console.error(`Error retrieving data from ${url}. Retrying...`);
        retries++;
      }
    }
    throw new InternalServerErrorException(
      `Failed to retrieve data from ${url} after ${maxRetries} retries`,
    );
  }
}
