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
    ConfigModule,
    ClientsModule.register([
      {
        name: 'HOTEL_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOTEL_SERVICE_HOST || 'localhost',
          port: 3032,
        },
      },
      {
        name: 'OPERATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.OPERATOR_SERVICE_HOST || 'localhost',
          port: 3031,
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    AxiosModule,
  ],
})
export class HotelModule {}
