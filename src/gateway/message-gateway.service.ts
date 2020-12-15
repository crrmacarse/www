import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageGatewayService {
    handleMsg(txt) {
        return txt;
    }
}