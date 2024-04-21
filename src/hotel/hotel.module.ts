import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AxiosModule } from '../axios/axios.module';

@Module({
  providers: [HotelResolver, HotelService],
  imports: [
    ClientsModule.register([
      {
        name: 'HOTEL_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3032,
        },
      },
      {
        name: 'OPERATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3031,
        },
      },
    ]),
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    AxiosModule,
  ],
})
export class HotelModule {}
