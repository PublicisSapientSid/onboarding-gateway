import { Field, ObjectType } from '@nestjs/graphql';
import { Hotel } from '../../hotel/entities/hotel.entity';

@ObjectType()
export class User {
  @Field(() => String)
  username: string;

  @Field(() => String)
  _id: string;

  @Field(() => Boolean)
  isAdmin: boolean;

  @Field(() => String)
  service: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;

  @Field(() => [Hotel])
  hotels: Hotel[];

  @Field(() => [String])
  airlines: string[];
}
