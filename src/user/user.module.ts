import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    ClientsModule.register([
      {
        name: 'OPERATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3031,
        },
      },
    ]),
  ],
})
export class UserModule {}
