import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class RoomTypeEntity {
  @Field(() => String)
  roomType: string;

  @Field(() => Number)
  pricing: number;

  @Field(() => [AvailabilityEntity])
  availability: AvailabilityEntity[];
}

@ObjectType()
class AvailabilityEntity {
  @Field(() => String)
  date: string;
  @Field(() => Number)
  available_rooms: number;
}
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

  @Field(() => Number)
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

  @Field(() => [RoomTypeEntity])
  types: RoomTypeEntity[];

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => [String])
  images: string[];

  @Field(() => User)
  owner: User;
}
