import { ItemPriceAdjusterVersion2 } from './class_initialized_within_sut_mock'
import { PricingService } from '../dependencies/PricingService'
import { createTypedMockClass } from './jest_typed_mock'
import { testItemBuilder } from '../builders/test_item_builder'

jest.mock('../dependencies/PricingService')

describe('ItemPriceAdjusterVersion2', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(9).build()
      const fakePricingService = {
        getMarkUpPercentage: jest.fn(() => 10),
      }
      createTypedMockClass(PricingService).mockImplementation(
        () => fakePricingService,
      )

      const sut = new ItemPriceAdjusterVersion2()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(9.9)
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(145).build()
      const fakePricingService = {
        getMarkDownPercentage: jest.fn(() => 20),
      }
      createTypedMockClass(PricingService).mockImplementation(
        () => fakePricingService,
      )

      const sut = new ItemPriceAdjusterVersion2()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(116)
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(100).build()
      const fakePricingService = {}
      createTypedMockClass(PricingService).mockImplementation(
        () => fakePricingService,
      )

      const sut = new ItemPriceAdjusterVersion2()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(100)
    })
  })
})
