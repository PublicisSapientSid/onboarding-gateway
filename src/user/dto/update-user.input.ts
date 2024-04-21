import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  username?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isAdmin?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  service?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  role?: string;
}
