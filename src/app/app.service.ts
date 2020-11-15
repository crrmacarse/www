import { Get, Injectable } from '@nestjs/common';
import welcomeMsg from 'constants/welcome';

@Injectable()
export class AppService {
  @Get()
  getHello(): string {
    return JSON.parse(JSON.stringify(welcomeMsg));
  }
}
