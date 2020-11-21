import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigModule } from 'app';
import { UploadService } from './upload.service';

describe('Upload Controller', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MulterModule, AppConfigModule],
      controllers: [UploadController],
      providers: [UploadService],
    }).compile();

    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
