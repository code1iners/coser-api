export const ENV_DEVELOPMENT: 'development' = 'development';
export const ENV_PRODUCTION: 'production' = 'production';

/**
 * ### Initialize environment configuration file path.
 */
export function initEnvironment() {
  require("dotenv").config({ path: getCurrentEnvironment() });
}

/**
 * ### Getting current environment file path.
 * @returns Environment file path as String.
 */
export function getCurrentEnvironment() {
  switch (process.env.NODE_ENV) {
    case ENV_DEVELOPMENT:
      return `${__dirname}/../../.env.${ENV_DEVELOPMENT}`;
    case ENV_PRODUCTION:
      return `${__dirname}/../../.env.${ENV_PRODUCTION}`;
    default:
      return `${__dirname}/../../.env`;
  }
}
