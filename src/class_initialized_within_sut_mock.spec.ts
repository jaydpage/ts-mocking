import { ItemPriceAdjusterVersion2 } from './class_initialized_within_sut_mock'
import { PricingService } from './dependencies/PricingService'
import { createTypedMockClass } from './typed_mock'

jest.mock('./dependencies/PricingService')

describe('ItemPriceAdjusterVersion2', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = {
        id: '1',
        name: 'foo',
        price: 9,
        description: '',
      }
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
      const item = {
        id: '1',
        name: 'foo',
        price: 145,
        description: '',
      }
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
      const item = {
        id: '1',
        name: 'foo',
        price: 100,
        description: '',
      }
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
