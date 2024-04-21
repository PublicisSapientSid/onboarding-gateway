import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Hotel {
  @Field(() => String)
  name: string;

  @Field(() => String)
  shortname: string;

  @Field(() => String)
  _id: string;

  @Field(() => String)
  latitude: string;

  @Field(() => String)
  longitude: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  country: string;

  @Field(() => Int)
  rating: number;

  @Field(() => [String])
  amenities: string[];

  @Field(() => Int)
  totalRooms: number;

  @Field(() => Boolean)
  hasRestaurant: boolean;

  @Field(() => Boolean)
  hasSpa: boolean;

  @Field(() => Boolean)
  hasParking: boolean;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  types: string[];

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => [String])
  images: string[];
}
