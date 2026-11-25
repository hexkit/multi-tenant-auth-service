import { FindManyPrismaService } from '@hexkit/prisma';

import { type PrismaClient } from '../../../../../generated/index.js';
import type * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseFindManyPrismaService<
  TModel,
  TFindQuery,
  TPrismaFindManyArgs,
  TPrismaModel,
> extends FindManyPrismaService<
  TModel,
  TFindQuery,
  TPrismaFindManyArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
