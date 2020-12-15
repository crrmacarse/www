import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationGatewayService {
    handleMsg(txt) {
        return txt;
    }
}