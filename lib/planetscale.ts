import { env } from "@/env.mjs"
import { DB } from "@/lib/db_types"
import { Kysely } from "kysely"
import {
  PlanetScaleDialect,
  PlanetScaleDialectConfig,
} from "kysely-planetscale"

const config: PlanetScaleDialectConfig = {
  url: env.DATABASE_URL,
}

export const queryBuilder = new Kysely<DB>({
  dialect: new PlanetScaleDialect(config),
})
