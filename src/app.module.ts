import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ClientsModule.register([
      {
        name: 'OPERATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.OPERATOR_SERVICE_HOST || 'localhost',
          port: 3031,
        },
      },
      {
        name: 'HOTEL_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOTEL_SERVICE_HOST || 'localhost',
          port: 3032,
        },
      },
    ]),
    HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
