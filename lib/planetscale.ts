import { env } from "@/env.mjs"
import { Kysely } from "kysely"
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale"
import { DB } from "./db_types"

const config: PlanetScaleDialectConfig = {
  url: env.DATABASE_URL,
}

export const queryBuilder = new Kysely<DB>({
  dialect: new PlanetScaleDialect(config),
})
