import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
// import { RegisterUserInput } from './dto/register-user.input';
import { SignInUserInput } from './dto/sign-in-user.input';
import { Token } from './entities/token.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input copy';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  findAll(): string {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('userID', { type: () => String }) userID: string,
    @Context('req') req: any,
  ): Promise<User> {
    return this.userService.updateUser(updateUserInput, userID, req);
  }

  @Mutation(() => User)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<User> {
    return this.userService.registerUser(registerUserInput);
  }

  @Mutation(() => Token)
  async signInUser(
    @Args('authInput') authInput: SignInUserInput,
  ): Promise<Token> {
    return this.userService.signInUser(authInput);
  }
}
