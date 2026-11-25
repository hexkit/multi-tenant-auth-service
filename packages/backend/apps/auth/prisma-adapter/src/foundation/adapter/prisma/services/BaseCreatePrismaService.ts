import { CreatePrismaService } from '@hexkit/prisma';

import { type PrismaClient } from '../../../../../generated/index.js';
import type * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseCreatePrismaService<
  TModel,
  TCreateQuery,
  TPrismaCreateArgs,
  TPrismaModel,
> extends CreatePrismaService<
  TModel,
  TCreateQuery,
  TPrismaCreateArgs,
  TPrismaModel,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
