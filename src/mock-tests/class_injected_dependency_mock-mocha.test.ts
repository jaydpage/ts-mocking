import { expect } from 'chai'
import sinon from 'sinon'
import { testItemBuilder } from '../builders/test_item_builder'
import { PricingService } from '../dependencies/PricingService'
import { ItemPriceAdjuster } from './class_injected_dependency_mock'

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(9).build()
      const pricingService = {
        getMarkUpPercentage: sinon.stub(() => 10),
      } as any

      const sut = new ItemPriceAdjuster(pricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).to.equal(9.9)
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(145).build()
      const pricingService = new PricingService()
      sinon.stub(pricingService, 'getMarkDownPercentage').resolves(20)

      const sut = new ItemPriceAdjuster(pricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).to.equal(116)
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(100).build()
      const pricingService = new PricingService()
      const sut = new ItemPriceAdjuster(pricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).to.equal(100)
    })
  })
})
