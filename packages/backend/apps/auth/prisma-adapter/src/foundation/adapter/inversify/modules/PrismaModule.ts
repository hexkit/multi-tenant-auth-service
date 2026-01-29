import {
  findManyUsersOutputPortSymbol,
  updateManyUsersOutputPortSymbol,
} from '@multi-tenant-auth-service/auth-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { PrismaClient } from '../../../../../generated/index.js';
import { FindManyUsersPrismaAdapter } from '../../../../user/adapter/prisma/adapters/FindManyUsersPrismaAdapter.js';
import { UpdateManyUsersPrismaAdapter } from '../../../../user/adapter/prisma/adapters/UpdateManyUsersPrismaAdapter.js';
import { UserFromUserPrismaBuilder } from '../../../../user/adapter/prisma/builders/UserFromUserPrismaBuilder.js';
import { UserPrismaFindManyArgsFromUserFindQueryBuilder } from '../../../../user/adapter/prisma/builders/UserPrismaFindManyArgsFromUserFindQueryBuilder.js';
import { UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder } from '../../../../user/adapter/prisma/builders/UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder.js';
import { UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder } from '../../../../user/adapter/prisma/builders/UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder.js';

export class PrismaModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(PrismaClient)
        .toResolvedValue(() => new PrismaClient())
        .inSingletonScope();
      options.bind(UserFromUserPrismaBuilder).toSelf().inSingletonScope();
      options
        .bind(UserPrismaFindManyArgsFromUserFindQueryBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(UserPrismaUpdateManyArgsFromUserUpdateQueryBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(UserPrismaUpdateManyArgsDataFromUserSetQueryBuilder)
        .toSelf()
        .inSingletonScope();

      options
        .bind(findManyUsersOutputPortSymbol)
        .to(FindManyUsersPrismaAdapter)
        .inSingletonScope();
      options
        .bind(updateManyUsersOutputPortSymbol)
        .to(UpdateManyUsersPrismaAdapter)
        .inSingletonScope();
    });
  }
}
