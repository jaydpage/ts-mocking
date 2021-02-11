import { ItemPriceAdjuster } from './class_injected_dependency_mock'
import { PricingService } from './dependencies/PricingService'
import { createTypedMockClass } from './typed_mock'

jest.mock('./dependencies/PricingService')

describe('PriceUpdater', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = {
        id: '1',
        name: 'foo',
        price: 9,
        description: '',
      }
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
      const item = {
        id: '1',
        name: 'foo',
        price: 145,
        description: '',
      }
      const mockPricingService = createTypedMockClass(PricingService)
      mockPricingService.getMarkDownPercentage = jest.fn(() => 20)

      const sut = new ItemPriceAdjuster(mockPricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(116)
    })
  })
})
