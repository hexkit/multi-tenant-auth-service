import { CreateManyPrismaService } from '@hexkit/prisma';

import { PrismaClient } from '../../../../../generated/index.js';
import * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseCreateManyPrismaService<
  TModel,
  TCreateQuery,
  TPrismaCreateManyArgs,
  TPrismaModel,
> extends CreateManyPrismaService<
  TModel,
  TCreateQuery,
  TPrismaCreateManyArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
