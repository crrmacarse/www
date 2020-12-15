import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MessageGatewayService } from './message-gateway.service';
import { NotificationGatewayService } from './notification-gateway.service';

@Module({
    providers: [AppGateway, NotificationGatewayService, MessageGatewayService],
    exports: [AppGateway, NotificationGatewayService, MessageGatewayService],
})
export class GatewayModule {}