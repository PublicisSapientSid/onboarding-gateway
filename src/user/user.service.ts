import { Injectable } from '@nestjs/common';
import { Token } from './entities/token.entity';
import { SignInUserInput } from './dto/sign-in-user.input';
import { AxiosService } from '../axios/axios.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input copy';

@Injectable()
export class UserService {
  constructor(private readonly axiosService: AxiosService) {}

  findAll(): string {
    return `This action returns all user`;
  }

  async updateUser(
    { email, password, role, service, username, isAdmin }: UpdateUserInput,
    usedID: string,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<User> {
    const { authorization } = headers;
    const requestBody = {
      email,
      password,
      role,
      service,
      username,
      isAdmin,
    };

    Object.keys(requestBody).forEach(
      (key) => requestBody[key] === undefined && delete requestBody[key],
    );

    console.log({ authorization, usedID, username, requestBody });

    return this.axiosService.axiosPatch(
      'http://localhost:3000/user/' + usedID,
      requestBody,
      {
        authorization,
      },
    );
  }

  async registerUser({
    email,
    isAdmin = false,
    password,
    role,
    service,
    username,
  }: RegisterUserInput): Promise<User> {
    return this.axiosService.axiosPost('http://localhost:3000/user/register', {
      email,
      isAdmin,
      password,
      role,
      service,
      username,
    });
  }

  async signInUser({ username, password }: SignInUserInput): Promise<Token> {
    return this.axiosService.axiosPost('http://localhost:3000/user/signin', {
      username,
      password,
    });
  }
}
