import { UpdateManyUsersOutputPort } from '@multi-tenant-auth-service/auth-application';
import { User, UserUpdateQuery } from '@multi-tenant-auth-service/auth-domain';
import { inject, injectable } from 'inversify';

import {
  Prisma,
  PrismaClient,
  User as PrismaUser,
} from '../../../../../generated';
import * as runtime from '../../../../../generated/runtime/client.js';
import { BaseUpdateManyPrismaService } from '../../../../foundation/adapter/prisma/services/BaseUpdateManyPrismaService.js';
import { UserFromUserPrismaBuilder } from '../builders/UserFromUserPrismaBuilder.js';
import { UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder } from '../builders/UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder.js';

@injectable()
export class UpdateManyUsersPrismaAdapter
  extends BaseUpdateManyPrismaService<
    User,
    UserUpdateQuery,
    Prisma.UserUpdateManyArgs,
    PrismaUser
  >
  implements UpdateManyUsersOutputPort
{
  constructor(
    @inject(PrismaClient)
    client: PrismaClient,
    @inject(UserFromUserPrismaBuilder)
    userFromUserPrismaBuilder: UserFromUserPrismaBuilder,
    @inject(UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder)
    userPrismaUpdateManyArgsFromUserUpdateQueryBuilder: UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder,
  ) {
    super(
      client.user,
      userFromUserPrismaBuilder,
      userPrismaUpdateManyArgsFromUserUpdateQueryBuilder,
    );
  }

  protected _getDelegate(
    transactionClient: Omit<PrismaClient, runtime.ITXClientDenyList>,
  ): Prisma.UserDelegate<runtime.DefaultArgs, Prisma.PrismaClientOptions> {
    return transactionClient.user;
  }
}
