import { getAll, Item } from './dependencies/get_all'

export async function getAllItemsOnSale(): Promise<Item[]> {
  const allItems = await getAll()
  const filtered = allItems.filter((x) => x.price < 10)
  return filtered
}
