import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'OPERATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.OPERATOR_SERVICE_HOST || 'localhost',
          port: 3031,
        },
      },
    ]),
  ],
})
export class UserModule {}
