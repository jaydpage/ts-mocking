import { Item } from './dependencies/Item'
import { PricingService } from './dependencies/PricingService'

export class ItemPriceAdjusterVersion2 {
  private pricingService: PricingService

  constructor() {
    this.pricingService = new PricingService()
  }

  async adjustPrice(item: Item): Promise<Item> {
    if (item.price > 100) {
      item.price = await this.getMarkedDownPrice(item.price)
    } else if (item.price < 100) {
      item.price = await this.getMarkedUpPrice(item.price)
    }
    return item
  }

  private async getMarkedUpPrice(price: number): Promise<number> {
    const priceMarkupPercentage = await this.pricingService.getMarkUpPercentage()
    return price + 0.01 * priceMarkupPercentage * price
  }

  private async getMarkedDownPrice(price: number): Promise<number> {
    const priceMarkdownPercentage = await this.pricingService.getMarkDownPercentage()
    return price - 0.01 * priceMarkdownPercentage * price
  }
}
