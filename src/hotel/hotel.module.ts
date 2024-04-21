import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [HotelResolver, HotelService],
  imports: [
    ClientsModule.register([
      {
        name: 'HOTEL_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
})
export class HotelModule {}
