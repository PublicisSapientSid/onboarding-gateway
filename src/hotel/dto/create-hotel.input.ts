import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { RegisterUserInput } from '../../user/dto/register-user.input';

@InputType()
export class RoomType {
  @Field(() => String)
  @IsString()
  roomType: string;

  @Field(() => Number)
  @IsNumber()
  pricing: number;

  @Field(() => [Availability])
  @IsArray()
  @IsOptional()
  availability: Availability[];
}

@InputType()
class Availability {
  @Field(() => String)
  date: string;
  @Field(() => Number)
  available_rooms: number;
}

@InputType()
export class CreateHotelInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
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

  @Field(() => String)
  @IsNotEmpty()
  city: string;

  @Field(() => String)
  @IsNotEmpty()
  address: string;

  @Field(() => String)
  @IsNotEmpty()
  country: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  rating: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  amenities: string[];

  @Field(() => Number)
  @IsNumber()
  totalRooms: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  hasRestaurant: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  hasSpa: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  hasParking: boolean;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field(() => [RoomType])
  @ArrayNotEmpty()
  types: RoomType[];

  @Field(() => String)
  @IsNotEmpty()
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  email: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  images: string[];

  @Field(() => [RegisterUserInput], { nullable: true })
  @IsOptional()
  owner: RegisterUserInput;
}
