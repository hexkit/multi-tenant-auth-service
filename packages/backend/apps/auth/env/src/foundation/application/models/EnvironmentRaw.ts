export interface EnvironmentRaw {
  AUTH_API_KEY: string;
  AUTH_CORS_ORIGINS: string[];
  AUTH_DATABASE_CONNECTION_STRING: string;
  AUTH_HOST: string;
  AUTH_MAIL_DEFAULT_ADDRESS: string;
  AUTH_MAIL_HOST: string;
  AUTH_MAIL_PASSWORD: string;
  AUTH_MAIL_PORT: number;
  AUTH_MAIL_USE_TLS: boolean;
  AUTH_MAIL_USER: string;
  AUTH_PORT: number;
  AUTH_SUPER_ADMIN_LIST: Array<{ email: string; name: string }>;
}
