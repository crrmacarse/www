import { SetMetadata } from '@nestjs/common'

export type roleType = 'admin' | 'client' | 'user'

export const Roles = (...roles: roleType[]) => SetMetadata('roles', roles);