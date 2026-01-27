import { UpdateManyPrismaService } from '@hexkit/prisma';

import { PrismaClient } from '../../../../../generated/index.js';
import * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseUpdateManyPrismaService<
  TModel,
  TUpdateQuery,
  TPrismaUpdateManyArgs,
  TPrismaModel,
> extends UpdateManyPrismaService<
  TModel,
  TUpdateQuery,
  TPrismaUpdateManyArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
