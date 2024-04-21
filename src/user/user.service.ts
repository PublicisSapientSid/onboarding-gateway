import { Inject, Injectable } from '@nestjs/common';
import { Token } from './entities/token.entity';
import { SignInUserInput } from './dto/sign-in-user.input';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input copy';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('OPERATOR_SERVICE')
    private readonly operatorServiceClient: ClientProxy,
  ) {}

  async registerUser({
    email,
    isAdmin = false,
    password,
    role,
    service,
    username,
  }: RegisterUserInput): Promise<Observable<User>> {
    return this.operatorServiceClient
      .send('register', {
        email,
        isAdmin,
        password,
        role,
        service,
        username,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  async signInUser({
    username,
    password,
  }: SignInUserInput): Promise<Observable<Token>> {
    return this.operatorServiceClient
      .send('signIn', { username, password })
      .pipe(
        map((response: any) => {
          const token: Token = {
            access_token: response.access_token,
          };
          return token;
        }),
      );
  }

  async findSingleUser(
    userID: string,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<User>> {
    const { authorization } = headers;

    return this.operatorServiceClient
      .send('findOne', { authorization, userID })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }

  async findAllUsers({
    headers,
  }: {
    headers: {
      authorization: string;
    };
  }): Promise<Observable<User[]>> {
    const { authorization } = headers;

    return this.operatorServiceClient.send('findAll', { authorization }).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  async updateUser(
    { email, password, role, service, username, isAdmin }: UpdateUserInput,
    userID: string,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<User>> {
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

    return this.operatorServiceClient
      .send('update', {
        userID,
        requestBody,
        authorization,
      })
      .pipe((response: any) => response);
  }

  async deleteUser(
    userID: string,
    {
      headers,
    }: {
      headers: {
        authorization: string;
      };
    },
  ): Promise<Observable<User>> {
    const { authorization } = headers;

    return this.operatorServiceClient
      .send('delete', { userID, authorization })
      .pipe((response: any) => response);
  }
}
