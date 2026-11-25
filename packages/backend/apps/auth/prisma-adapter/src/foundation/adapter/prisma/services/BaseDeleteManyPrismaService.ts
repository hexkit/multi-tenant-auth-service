import { DeleteManyPrismaService } from '@hexkit/prisma';

import { type PrismaClient } from '../../../../../generated/index.js';
import type * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseDeleteManyPrismaService<
  TDeleteQuery,
  TPrismaDeleteManyArgs,
> extends DeleteManyPrismaService<
  TDeleteQuery,
  TPrismaDeleteManyArgs,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
