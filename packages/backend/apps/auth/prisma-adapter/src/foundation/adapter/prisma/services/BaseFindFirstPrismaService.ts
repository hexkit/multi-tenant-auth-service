import { FindFirstPrismaService } from '@hexkit/prisma';

import { PrismaClient } from '../../../../../generated/index.js';
import * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseFindFirstPrismaService<
  TModel,
  TFindQuery,
  TPrismaFindArgs,
  TPrismaModel,
> extends FindFirstPrismaService<
  TModel,
  TFindQuery,
  TPrismaFindArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
