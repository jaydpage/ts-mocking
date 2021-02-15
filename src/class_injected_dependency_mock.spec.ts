import { ItemPriceAdjuster } from './class_injected_dependency_mock'
import { PricingService } from './dependencies/PricingService'
import { fakeItemBuilder } from './fake_item_builder'
import { createTypedMockClass } from './jest_typed_mock'

jest.mock('./dependencies/PricingService')

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = fakeItemBuilder().withPrice(9).build()
      const pricingService = {
        getMarkUpPercentage: jest.fn(() => 10),
      } as any

      const sut = new ItemPriceAdjuster(pricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(9.9)
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      const item = fakeItemBuilder().withPrice(145).build()
      const mockPricingService = createTypedMockClass(PricingService)
      mockPricingService.getMarkDownPercentage = jest.fn(() => 20)

      const sut = new ItemPriceAdjuster(mockPricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(116)
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      const item = fakeItemBuilder().withPrice(100).build()
      const mockPricingService = createTypedMockClass(PricingService)

      const sut = new ItemPriceAdjuster(mockPricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(100)
    })
  })
})
