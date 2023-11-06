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
    databaseUrl: env.DATABASE_URL,
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
    dev: getBooleanFromString(env.DEV, false),
  };
};

interface EnvFile {
  hostname: string;

  databaseUrl: string;

  jwtPublicKey: string;
  jwtPrivateKey: string;

  allowedDomains: string[];
  allowSelfPasswordRecovery: boolean;

  openApi: boolean;
  cors: boolean;
  port: number;
  helmet: boolean;

  dev: boolean;
}

class RawEnvFile {
  HOSTNAME: string;

  DATABASE_URL: string;

  JWT_PUBLIC_KEY: string;
  JWT_PRIVATE_KEY: string;

  OPEN_API?: string;
  CORS?: string;
  PORT?: string;
  HELMET?: string;

  ALLOWED_DOMAINS?: string;
  ALLOW_SELF_PASSWORD_RECOVERY?: string;

  DEV?: string;
}
