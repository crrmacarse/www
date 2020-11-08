import { SetMetadata } from '@nestjs/common';

export type permissionType = 'write' | 'read' | 'execute';

export const Permissions = (...permissions: permissionType[]) =>
  SetMetadata('permissions', permissions);