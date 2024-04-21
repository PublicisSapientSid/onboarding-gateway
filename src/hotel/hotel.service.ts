import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Injectable()
export class HotelService {
  constructor(
    @Inject('HOTEL_SERVICE')
    private readonly operatorServiceClient: ClientProxy,
  ) {}

  async findAllHotels({
    headers,
  }: {
    headers: {
      authorization: string;
    };
  }): Promise<Observable<Hotel[]>> {
    const { authorization } = headers;

    return this.operatorServiceClient
      .send('findAllHotels', { authorization })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  async findHotel(
    hotelID: string,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<Hotel>> {
    const { authorization } = headers;

    return this.operatorServiceClient
      .send('findHotel', { hotelID, authorization })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  async createHotel(
    createHotelInput: CreateHotelInput,
  ): Promise<Observable<Hotel>> {
    return this.operatorServiceClient
      .send('createHotel', createHotelInput)
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  async updateHotel(
    hotelID: string,
    updateHotelInput: UpdateHotelInput,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<Hotel>> {
    const { authorization } = headers;

    return this.operatorServiceClient
      .send('updateHotel', { hotelID, updateHotelInput, authorization })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  async deleteHotel(
    hotelID: string,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<Hotel>> {
    const { authorization } = headers;

    return this.operatorServiceClient
      .send('deleteHotel', { hotelID, authorization })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }
}
