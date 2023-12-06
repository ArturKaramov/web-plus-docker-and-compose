export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  jwt_secret: process.env.DATABASE_HOST || 'some-secret-key',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'student',
    password: process.env.DATABASE_PASSWORD || 'student',
    database: process.env.DATABASE_NAME || 'kupipodariday',
  },
});
