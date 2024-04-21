import { Field, Float, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { RoomType } from './create-hotel.input';

@InputType()
export class UpdateHotelInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  shortname: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  latitude: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  longitude: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  city: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  address: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  country: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  rating: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  amenities: string[];

  @Field(() => Number, { nullable: true })
  @IsOptional()
  totalRooms: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  hasRestaurant: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  hasSpa: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  hasParking: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;

  @Field(() => [RoomType], { nullable: true })
  @IsOptional()
  types: RoomType[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  images: string[];
}
