import { Logger } from '@nestjs/common';

const getBooleanFromString = (value: string | undefined, def = false) => {
  if (value === undefined || value === '') return def;

  return ['true', '1', 'yes', 'enabled'].includes(value.toLowerCase());
};

const getNumberFromString = (value: string | undefined, def: number) => {
  if (value === undefined) return def;

  const num = +value;

  if (isNaN(num)) {
    Logger.warn(
      `'${value}' is not a number. It has been defaulted to '${def}'. Please, check the configuration file and set a valid number.`,
    );
    return def;
  }
  return num;
};

const getOptionalString = (value: string | undefined, def: string) => {
  if (!value || value === '') return def;
  return value;
};

export const getEnv = (): EnvFile => {
  const env = process.env as unknown as RawEnvFile;

  return {
    hostname: env.HOSTNAME,
    database: {
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      name: env.DATABASE_NAME,
      host: env.DATABASE_HOST,
      port: getNumberFromString(env.DATABASE_PORT, 1433),
      schema: getOptionalString(env.DATABASE_SCHEMA, 'tmwu_auth'),
      logging: getBooleanFromString(env.DATABASE_LOGGING, false),
    },
    jwtPublicKey: env.JWT_PUBLIC_KEY,
    jwtPrivateKey: env.JWT_PRIVATE_KEY,
    allowedDomains: JSON.parse(env.ALLOWED_DOMAINS),
    allowSelfPasswordRecovery: getBooleanFromString(
      env.ALLOW_SELF_PASSWORD_RECOVERY,
      true,
    ),
    openApi: getBooleanFromString(env.OPEN_API),
    cors: getBooleanFromString(env.CORS, true),
    port: getNumberFromString(env.PORT, 5000),
    helmet: getBooleanFromString(env.HELMET, true),
  };
};

interface EnvFile {
  hostname: string;

  database: {
    user: string;
    password: string;
    name: string;
    host: string;
    port: number;
    schema: string;
    logging: boolean;
  };

  jwtPublicKey: string;
  jwtPrivateKey: string;

  allowedDomains: string[];
  allowSelfPasswordRecovery: boolean;

  openApi: boolean;
  cors: boolean;
  port: number;
  helmet: boolean;
}

class RawEnvFile {
  HOSTNAME: string;

  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_HOST: string;
  DATABASE_PORT?: string;
  DATABASE_SCHEMA?: string;
  DATABASE_LOGGING?: string;

  JWT_PUBLIC_KEY: string;
  JWT_PRIVATE_KEY: string;

  OPEN_API?: string;
  CORS?: string;
  PORT?: string;
  HELMET?: string;

  ALLOWED_DOMAINS?: string;
  ALLOW_SELF_PASSWORD_RECOVERY?: string;
}
