import { Builder } from '@hexkit/patterns';
import { UserSetQuery } from '@multi-tenant-auth-service/auth-domain';
import { injectable } from 'inversify';

import { UserPrismaUpdateManyArgsData } from '../models/UserPrismaUpdateManyArgsData.js';

@injectable()
export class UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder implements Builder<
  UserPrismaUpdateManyArgsData,
  [UserSetQuery]
> {
  public build(userSetQuery: UserSetQuery): UserPrismaUpdateManyArgsData {
    const data: UserPrismaUpdateManyArgsData = {};

    if (userSetQuery.role !== undefined) {
      data.role = userSetQuery.role;
    }

    return data;
  }
}
