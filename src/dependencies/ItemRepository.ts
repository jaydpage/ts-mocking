import { Item } from '../dependencies/Item'

export class ItemRepository {
  private items: Item[] = []

  async insert(item: Item): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    this.items.push(item)
  }

  async getAll(): Promise<Item[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.items
  }
}
