export const PORT = 8060;

// eslint-disable-next-line max-len
// update db connection credentials. for now use this flat file, ideally these creds should pull from secret key store
export const dbConfigs = {
  database: 'product_api_db',
  password: 'xxxxxx',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
};
