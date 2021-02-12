import { Item } from './dependencies/Item'
import { InMemoryCache } from './dependencies/InMemoryCache'
import { ItemRepository } from './dependencies/ItemRepository'
import { PubSub } from './dependencies/PubSub'

// TODO: write tests for this
export class ItemProcessor {
  private pubSub: PubSub
  private isProcessing: boolean
  private processedItems: Item[]

  constructor(
    private cache: InMemoryCache,
    private itemRepository: ItemRepository,
  ) {
    this.pubSub = PubSub.getInstance()
  }

  async processItems(): Promise<void> {
    if (this.isProcessing) {
      return
    }
    this.isProcessing = true

    const unprocessedItems = await this.getUnprocessedItems()

    for (const item of unprocessedItems) {
      this.cache.update(item)
      this.pubSub.publish('item:updated', item)
    }

    this.isProcessing = false
    this.processAgainAfterInterval()
  }

  private async getUnprocessedItems(): Promise<Item[]> {
    const items = await this.itemRepository.getAll()
    return items.filter((_) => !this.processedItems.includes(_))
  }

  private processAgainAfterInterval() {
    setTimeout(() => {
      this.processItems()
    }, 5000)
  }
}
