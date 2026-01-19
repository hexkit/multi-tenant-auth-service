export interface SuperAdmin {
  email: string;
  name: string;
}

export interface Environment {
  apiKey: string;
  corsOrigins: string[];
  databaseConnectionString: string;
  host: string;
  mail: {
    defaultAddress: string;
    host: string;
    password: string;
    port: number;
    user: string;
    useTls: boolean;
  };
  port: number;
  superAdminList: SuperAdmin[];
}
