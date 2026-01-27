import { DeleteManyPrismaService } from '@hexkit/prisma';

import { PrismaClient } from '../../../../../generated/index.js';
import * as runtime from '../../../../../generated/runtime/client.js';

export abstract class BaseDeleteManyPrismaService<
  TDeleteQuery,
  TPrismaDeleteManyArgs,
> extends DeleteManyPrismaService<
  TDeleteQuery,
  TPrismaDeleteManyArgs,
  Omit<PrismaClient, runtime.ITXClientDenyList>
> {}
