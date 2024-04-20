import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AxiosModule } from '../axios/axios.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [AxiosModule],
})
export class UserModule {}
