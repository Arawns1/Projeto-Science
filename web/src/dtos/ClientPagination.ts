import { Client } from "./ClientDTO"

export interface ClientPagination {
  data: Client[]
  first: number
  items: number
  last: number
  next: number | null
  pages: number
  prev: number | null
}
