require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'URL_DATABASE',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'URL_DATABASE',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'URL_DATABASE',
    dialect: 'postgres',
  },
};
