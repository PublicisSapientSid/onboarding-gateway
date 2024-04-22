import {
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { JwtService } from '@nestjs/jwt';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class HotelService implements OnModuleInit {
  constructor(
    @Inject('HOTEL_SERVICE')
    private readonly hotelServiceClient: ClientProxy,
    @Inject('OPERATOR_SERVICE')
    private readonly operatorServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly axiosService: AxiosService,
  ) {}

  async onModuleInit() {
    try {
      const findHotelData = await firstValueFrom(
        this.hotelServiceClient.send('findAllHotels', {}) as Observable<
          Record<string, any>[]
        >,
      );

      if (findHotelData.length !== 0) {
        return;
      }

      const coldStartHotelList = (await this.axiosService.retryAxiosGet(
        'http://localhost:3005/hotel',
      )) as Hotel[];
      const superuser = {
        username: process.env.COLD_START_USER,
        password: process.env.COLD_START_PASSWORD,
        email: process.env.COLD_START_EMAIL,
        role: process.env.COLD_START_ROLE,
        service: process.env.COLD_START_SERVICE,
        isAdmin: process.env.COLD_START_ROLE === 'admin',
        hotels: coldStartHotelList,
      };
      await firstValueFrom(
        this.operatorServiceClient.send('coldStart', superuser).pipe(
          map(async (response: any) => {
            const { password: _, ...superUser } = response;
            coldStartHotelList.forEach((hotel) => {
              hotel.owner = superUser;
            });
            await firstValueFrom(
              this.hotelServiceClient.send('hotelsColdStart', {
                createHotelInput: coldStartHotelList,
                owner: superUser,
              }),
            );
            return response;
          }),
        ),
      );
    } catch (error) {
      throw new HttpException('Cold start failed', 500);
    }
  }

  async findAllHotels({
    headers,
  }: {
    headers: {
      authorization: string;
    };
  }): Promise<Observable<Hotel[]>> {
    const { authorization } = headers;

    await this.authenticateUser(authorization);

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

    await this.authenticateUser(authorization);

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
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<Hotel>> {
    const { authorization } = headers;

    const foundUser = await this.authenticateUser(authorization);

    delete foundUser.password;

    return this.hotelServiceClient
      .send('createHotel', { createHotelInput, owner: foundUser })
      .pipe(
        tap(async (response: any) => {
          const { owner, ...hotelInfo } = response;
          await firstValueFrom(
            this.operatorServiceClient.send('update', {
              userID: foundUser._id,
              requestBody: { hotels: hotelInfo },
              authorization,
            }),
          );
        }),
        map((response: any) => response),
      ) as Observable<Hotel>;
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

    await this.authenticateUser(authorization);

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

    await this.authenticateUser(authorization);

    return this.hotelServiceClient
      .send('deleteHotel', { hotelID, authorization })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  private async authenticateUser(authorization: string) {
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

    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    if (!foundUser.isAdmin) {
      throw new HttpException('Not authorized', 401);
    }
    return foundUser;
  }
}
