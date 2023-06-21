import { Kysely } from "kysely";
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale";

export interface Stats {
  slug: string;
  likes: number;
  views: number;
}

export interface Session {
  id: string;
  createdAt: Date;
}

interface Database {
  stats: Stats;
  session: Session;
}

const config: PlanetScaleDialectConfig = {
  url: process.env.DATABASE_URL,
};

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect(config),
});

// CREATE TABLE `stats` (
//   `slug` varchar(255) NOT NULL PRIMARY KEY,
//   `likes` int,
//   `views` int
// );

// CREATE TABLE `session` (
//   `id` varchar(255) PRIMARY KEY,
//   `createdAt` timestamp default CURRENT_TIMESTAMP
// );
