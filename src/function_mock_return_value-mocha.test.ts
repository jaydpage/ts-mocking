import { expect } from 'chai'
import { fakeItemBuilder } from './fake_item_builder'
import sinon from 'sinon'
import * as items from './dependencies/get_all'
import { getAllItemsOnSale } from './function_mock_return_value'

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      const itemOnSale = fakeItemBuilder().withPrice(9).build()
      const itemNotOnSale = fakeItemBuilder().withPrice(10).build()

      sinon.stub(items, 'getAll').resolves([itemOnSale, itemNotOnSale])
      // Act
      const result = await getAllItemsOnSale()
      // Assert
      expect(result).to.eql([itemOnSale])
    })
  })
})
