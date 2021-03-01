import { getAll } from "../dependencies/get_all"
import { Item } from "../dependencies/Item"

export async function getAllItemsOnSale(): Promise<Item[]> {
  const allItems = await getAll()
  const filtered = allItems.filter((x) => x.price < 10)
  return filtered
}
