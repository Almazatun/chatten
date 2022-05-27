import { join } from "path";
import { ConnectionOptions } from "typeorm";

import { User } from "./user/entities/user.entity";

const entities = [
  User,
];

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  // port: +config.port,
  host: config.host || "127.0.0.1",
  username: config.username || "postgres",
  password: config.password || "123456789",
  database: config.database || "namedb",
  entities,
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: true,
  migrations: [
    join(__dirname, "database/migrations/*{.ts,.js}"),
  ],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};

export = connectionOptions
