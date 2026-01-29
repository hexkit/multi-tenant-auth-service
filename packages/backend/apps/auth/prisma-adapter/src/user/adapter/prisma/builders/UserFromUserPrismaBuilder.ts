import { Builder } from '@hexkit/patterns';
import { User } from '@multi-tenant-auth-service/auth-domain';
import { injectable } from 'inversify';

import { User as PrismaUser } from '../../../../../generated/index.js';

@injectable()
export class UserFromUserPrismaBuilder implements Builder<User, [PrismaUser]> {
  public build(prismaUser: PrismaUser): User {
    return {
      email: prismaUser.email,
      id: prismaUser.id,
      name: prismaUser.name,
      role: prismaUser.role ?? undefined,
    };
  }
}
