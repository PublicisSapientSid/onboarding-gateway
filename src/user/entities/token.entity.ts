import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String, { description: 'Example field (placeholder)' })
  access_token: string;
}
