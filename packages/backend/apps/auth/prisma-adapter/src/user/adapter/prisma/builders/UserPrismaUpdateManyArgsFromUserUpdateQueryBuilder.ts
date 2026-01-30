import { Builder } from '@hexkit/patterns';
import {
  UserFindQuery,
  UserSetQuery,
  UserUpdateQuery,
} from '@multi-tenant-auth-service/auth-domain';
import { inject, injectable } from 'inversify';

import { Prisma } from '../../../../../generated/index.js';
import { PrismaUpdateManyArgsFromUpdateQueryBuilder } from '../../../../foundation/adapter/prisma/builders/PrismaUpdateManyArgsFromUpdateQueryBuilder.js';
import { UserPrismaFindManyArgsFromUserFindQueryBuilder } from './UserPrismaFindManyArgsFromUserFindQueryBuilder.js';
import { UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder } from './UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder.js';

@injectable()
export class UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder
  extends PrismaUpdateManyArgsFromUpdateQueryBuilder<
    UserFindQuery,
    UserSetQuery,
    Prisma.UserUpdateManyAndReturnArgs
  >
  implements Builder<Prisma.UserUpdateManyAndReturnArgs, [UserUpdateQuery]>
{
  constructor(
    @inject(UserPrismaFindManyArgsFromUserFindQueryBuilder)
    userPrismaFindManyArgsFromUserFindQueryBuilder: UserPrismaFindManyArgsFromUserFindQueryBuilder,
    @inject(UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder)
    userPrismaUpdateManyArgsDataFromUserSetQueryBuilder: UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder,
  ) {
    super(
      userPrismaFindManyArgsFromUserFindQueryBuilder,
      userPrismaUpdateManyArgsDataFromUserSetQueryBuilder,
    );
  }
}
