import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  username: string;

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

  @Field(() => [String])
  hotels: string[];

  @Field(() => [String])
  airlines: string[];
}

@ObjectType()
export class Temp {
  @Field(() => String)
  hello: string;
}
