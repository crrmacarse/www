import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage, WebSocketGateway,
  WebSocketServer, WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageGatewayService } from './message-gateway.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private messageGatewayService: MessageGatewayService,
  ) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(_server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ..._args) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  @SubscribeMessage('messages')
  handleMessage(_client: Socket, text: string): void {
    this.messageGatewayService.handleMsg(text);
  
    this.wss.emit('notifications', text);
  }

  @SubscribeMessage('notifications')
  handleNotifications(_client: Socket, text: string): void {
    this.wss.emit('notifications', text);
  }
  
  @SubscribeMessage('notification')
  handleNotification(_client: Socket, text: string): WsResponse<string> {
    return { event: 'notification', data: text};
  }
}
