import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { SignInUserInput } from './dto/sign-in-user.input';
import { Token } from './entities/token.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input copy';
import { Observable } from 'rxjs';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async findAllUsers(@Context('req') req: any): Promise<Observable<User[]>> {
    return this.userService.findAllUsers(req);
  }

  @Query(() => User)
  async findSingleUser(
    @Args('userID') userID: string,
    @Context('req') req: any,
  ): Promise<Observable<User>> {
    return this.userService.findSingleUser(userID, req);
  }

  @Mutation(() => User)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<Observable<User>> {
    return this.userService.registerUser(registerUserInput);
  }

  @Mutation(() => Token)
  async signInUser(
    @Args('authInput') authInput: SignInUserInput,
  ): Promise<Observable<Token>> {
    return this.userService.signInUser(authInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userID', { type: () => String }) userID: string,
    @Context('req') req: any,
  ): Promise<Observable<User>> {
    return this.userService.updateUser(updateUserInput, userID, req);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('userID', { type: () => String }) userID: string,
    @Context('req') req: any,
  ): Promise<Observable<User>> {
    return this.userService.deleteUser(userID, req);
  }
}
