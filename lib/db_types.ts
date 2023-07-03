import type { ColumnType } from "kysely"

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Session = {
  id: number
  createdAt: Generated<Timestamp>
  likes: Generated<number>
}
export type Stats = {
  slug: string
  views: Generated<number>
  likes: Generated<number>
}
export type DB = {
  Session: Session
  Stats: Stats
}
