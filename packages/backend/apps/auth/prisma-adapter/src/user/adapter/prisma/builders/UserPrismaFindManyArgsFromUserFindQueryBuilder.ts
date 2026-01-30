import { Builder } from '@hexkit/patterns';
import { UserFindQuery } from '@multi-tenant-auth-service/auth-domain';
import { injectable } from 'inversify';

import { Prisma } from '../../../../../generated/index.js';

@injectable()
export class UserPrismaFindManyArgsFromUserFindQueryBuilder implements Builder<
  Prisma.UserFindManyArgs,
  [UserFindQuery]
> {
  public build(userFindQuery: UserFindQuery): Prisma.UserFindManyArgs {
    const findManyArgsWhere: Prisma.UserWhereInput = {};
    const findManyArgs: Prisma.UserFindManyArgs = {
      where: findManyArgsWhere,
    };

    if (userFindQuery.id !== undefined && userFindQuery.id.length > 0) {
      findManyArgsWhere.id = { in: userFindQuery.id };
    }

    if (userFindQuery.email !== undefined && userFindQuery.email.length > 0) {
      findManyArgsWhere.email = { in: userFindQuery.email };
    }

    return findManyArgs;
  }
}
