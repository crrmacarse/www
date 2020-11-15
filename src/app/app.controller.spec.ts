import { Test, TestingModule } from '@nestjs/testing';
import welcomeMsg from 'constants/welcome';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a Welcome Message', () => {
      expect(appController.getHello()).toMatchObject(JSON.parse(JSON.stringify(welcomeMsg)));
    });
  });
});
