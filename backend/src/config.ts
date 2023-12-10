export default () => ({
  port: process.env.PORT || 3000,
  jwt_secret: process.env.POSTGRES_HOST || 'some-secret-key',
  database: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    name: process.env.POSTGRES_NAME || 'kupipodariday',
  },
});
