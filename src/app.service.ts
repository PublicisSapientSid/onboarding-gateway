import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('OPERATOR_SERVICE')
    private readonly operatorServiceClient: ClientProxy,
  ) {}

  async getHealth(): Promise<Observable<string>> {
    return this.operatorServiceClient.send('health', {});
  }
}
