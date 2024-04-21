import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HotelService {
  constructor(
    @Inject('HOTEL_SERVICE')
    private readonly hotelServiceClient: ClientProxy,
    @Inject('OPERATOR_SERVICE')
    private readonly operatorServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async findAllHotels({
    headers,
  }: {
    headers: {
      authorization: string;
    };
  }): Promise<Observable<Hotel[]>> {
    const { authorization } = headers;

    const userInfo = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );

    if (!authorization || !userInfo?.sub) {
      throw new HttpException('Unauthorized', 401);
    }

    const foundUser = await firstValueFrom(
      this.operatorServiceClient.send('findOne', {
        userID: userInfo?.sub,
        authorization,
      }),
    );

    console.log({ foundUser });

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    if (!foundUser.isAdmin) {
      throw new HttpException('Not authorized', 401);
    }

    return this.hotelServiceClient.send('findAllHotels', {}).pipe(
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

    const userInfo = this.jwtService.decode(
      authorization.replace('Bearer ', ''),
    );

    if (!authorization || !userInfo?.sub) {
      throw new HttpException('Unauthorized', 401);
    }

    const foundUser = await firstValueFrom(
      this.operatorServiceClient.send('findOne', {
        userID: userInfo?.sub,
        authorization,
      }),
    );

    console.log({ foundUser });

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    if (!foundUser.isAdmin) {
      throw new HttpException('Not authorized', 401);
    }

    return this.hotelServiceClient
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
    return this.hotelServiceClient.send('createHotel', createHotelInput).pipe(
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

    return this.hotelServiceClient
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

    return this.hotelServiceClient
      .send('deleteHotel', { hotelID, authorization })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }
}
