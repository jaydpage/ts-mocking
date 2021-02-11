export class PricingService {
  async getMarkUpPercentage(): Promise<number> {
    return Math.floor(Math.random() * 100 + 1)
  }

  async getMarkDownPercentage(): Promise<number> {
    return Math.floor(Math.random() * 100 + 1)
  }
}
