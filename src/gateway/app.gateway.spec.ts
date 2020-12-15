import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';
import { MessageGatewayService } from './message-gateway.service';
import { NotificationGatewayService } from './notification-gateway.service';

describe('AppGateway', () => {
  let gateway: AppGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppGateway, MessageGatewayService, NotificationGatewayService],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
