import { expect } from 'chai'
import sinon from 'sinon'
import { testItemBuilder } from '../builders/test_item_builder'
import * as items from '../dependencies/get_all'
import { getAllItemsOnSale } from './function_return_value'

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      const itemOnSale = testItemBuilder().withPrice(9).build()
      const itemNotOnSale = testItemBuilder().withPrice(10).build()

      sinon.stub(items, 'getAll').resolves([itemOnSale, itemNotOnSale])
      // Act
      const result = await getAllItemsOnSale()
      // Assert
      expect(result).to.eql([itemOnSale])
    })
  })
})
