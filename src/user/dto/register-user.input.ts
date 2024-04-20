import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsIn, IsEmail, IsOptional } from 'class-validator';
import {
  HOTEL_SERVICE,
  AIRLINE_SERVICE,
  ADMIN_ROLE,
  MANAGER_ROLE,
  STAFF_ROLE,
} from '../constants';

@InputType()
export class RegisterUserInput {
  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isAdmin: boolean;

  @Field(() => String)
  @IsIn([HOTEL_SERVICE, AIRLINE_SERVICE])
  service: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;

  @Field(() => String)
  @IsIn([ADMIN_ROLE, MANAGER_ROLE, STAFF_ROLE])
  role: string;
}
