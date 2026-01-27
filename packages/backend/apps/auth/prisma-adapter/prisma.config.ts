import path from 'node:path';

import 'dotenv/config';

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: env('AUTH_DATABASE_CONNECTION_STRING'),
    shadowDatabaseUrl: env('AUTH_SHADOW_DATABASE_CONNECTION_STRING'),
  },
  schema: path.join('prisma', 'schema.prisma'),
});
