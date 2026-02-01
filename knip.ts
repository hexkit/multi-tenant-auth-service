import { type KnipConfig, type WorkspaceProjectConfig } from "knip";

const defaultWorkspaceProjectConfig: WorkspaceProjectConfig & {
  entry: string[];
  ignoreDependencies: string[];
  project: string[];
} = {
  entry: [
    "{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "src/{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "**/?(*.)+(spec|spec-d).[jt]s?(x)",
  ],
  ignoreDependencies: ["tslib"],
  project: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!", "!**/__mocks__"],
};

export default {
  commitlint: {
    config: "config/commitlint/commitlint.config.js",
  },
  prisma: {
    config: [],
  },
  workspaces: {
    ".": {
      entry: [],
      ignoreBinaries: ["trap"],
      ignoreDependencies: [
        "@hexkit/instructions",
        "@multi-tenant-auth-service/scripts",
      ],
      project: [],
    },
    "packages/backend/apps/*/*": defaultWorkspaceProjectConfig,
    "packages/backend/apps/auth/prisma-adapter": {
      ...defaultWorkspaceProjectConfig,
      entry: [...defaultWorkspaceProjectConfig.entry, "generated/**/*.js"],
      ignoreDependencies: [
        ...defaultWorkspaceProjectConfig.ignoreDependencies,
        "@prisma/adapter-pg",
        "@prisma/client",
        "@prisma/client-runtime-utils",
        "dotenv",
        "prisma",
      ],
      ignoreFiles: ["prisma.config.ts"],
    },
    "packages/backend/libraries/*": defaultWorkspaceProjectConfig,
    "packages/backend/tools/*": defaultWorkspaceProjectConfig,
    "packages/libraries/*": defaultWorkspaceProjectConfig,
  },
} satisfies KnipConfig;
