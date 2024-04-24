import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { AxiosService } from './axios.service';

describe('AxiosService', () => {
  let axiosService: AxiosService;

  beforeEach(() => {
    axiosService = new AxiosService(); // Remove the argument passed to the constructor
  });

  describe('retryAxiosGet', () => {
    it('should retry axiosGet and return the response data', async () => {
      const url = 'https://example.com/api';
      const responseData = { message: 'Hello World!' };
      const axiosResponse: AxiosResponse<typeof responseData> = {
        data: responseData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as AxiosRequestHeaders }, // Fix: Add 'as AxiosRequestHeaders' to cast the object
      };
      jest.spyOn(axiosService, 'axiosGet').mockResolvedValueOnce(axiosResponse);

      const result = (await axiosService.retryAxiosGet(
        url,
        3,
      )) as unknown as AxiosResponse;

      console.log({ responseData, result });
      expect(axiosService.axiosGet).toHaveBeenCalledTimes(1);
      expect(axiosService.axiosGet).toHaveBeenCalledWith(url);
      expect(result.data).toEqual(responseData);
    });

    it('should throw InternalServerErrorException after maxRetries', async () => {
      const url = 'https://example.com/api';
      axiosService.axiosGet = jest
        .fn()
        .mockRejectedValue(new Error('Request failed'));

      await expect(axiosService.retryAxiosGet(url, 3)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(axiosService.axiosGet).toHaveBeenCalledTimes(3);
      expect(axiosService.axiosGet).toHaveBeenCalledWith(url);
    });
  });
});
