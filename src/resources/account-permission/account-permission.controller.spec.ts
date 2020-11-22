import { Test, TestingModule } from '@nestjs/testing';
import { AccountPermissionController } from './account-permission.controller';

describe('AccountPermissionController', () => {
  let controller: AccountPermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountPermissionController],
    }).compile();

    controller = module.get<AccountPermissionController>(AccountPermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
