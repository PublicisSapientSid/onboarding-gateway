import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { Hotel } from './entities/hotel.entity';
import { Observable } from 'rxjs';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query(() => [Hotel])
  async findAllHotels(@Context('req') req: any): Promise<Observable<Hotel[]>> {
    return this.hotelService.findAllHotels(req);
  }

  @Query(() => Hotel)
  async findHotel(
    @Args('hotelID') hotelID: string,
    @Context('req') req: any,
  ): Promise<Observable<Hotel>> {
    return this.hotelService.findHotel(hotelID, req);
  }

  @Mutation(() => Hotel)
  async createHotel(
    @Args('createHotelInput') createHotelInput: CreateHotelInput,
    @Context('req') req: any,
  ): Promise<Observable<Hotel>> {
    return this.hotelService.createHotel(createHotelInput, req);
  }

  @Mutation(() => Hotel)
  async updateHotel(
    @Args('hotelID', { type: () => String }) hotelID: string,
    @Args('updateHotelInput') updateHotelInput: UpdateHotelInput,
    @Context('req') req: any,
  ): Promise<Observable<Hotel>> {
    return this.hotelService.updateHotel(hotelID, updateHotelInput, req);
  }

  @Mutation(() => Hotel)
  async deleteHotel(
    @Args('hotelID', { type: () => String }) hotelID: string,
    @Context('req') req: any,
  ): Promise<Observable<Hotel>> {
    return this.hotelService.deleteHotel(hotelID, req);
  }
}
