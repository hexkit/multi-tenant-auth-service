export interface MailConfig {
  defaultAddress: string;
  host: string;
  password: string;
  port: number;
  user: string;
  useTls: boolean;
}

export interface SuperAdmin {
  email: string;
  name: string;
}

export interface Environment {
  apiKey: string;
  corsOrigins: string[];
  databaseConnectionString: string;
  host: string;
  mail: MailConfig;
  port: number;
  superAdminList: SuperAdmin[];
}
