module.exports = [
  {
    name: 'default',
    type: process.env.DB_TYPE,
    host: process.env.IP,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: process.env.DB_LOGGING,
    dropSchema: true,
    charset: "utf8mb4",
    timezone: "local",
    entities: [
      'src/entity/**/*.ts',
      'src/modules/**/*.entity.{ts,js}'
    ],
    migrations: [
      "src/migration/**/*.ts"
    ],
    subscribers: [
      "src/subscriber/**/*.ts"
    ],
    cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  }
]