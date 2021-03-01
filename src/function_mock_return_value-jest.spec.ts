import { getAll } from './dependencies/get_all'
import { fakeItemBuilder } from './fake_item_builder'
import { getAllItemsOnSale } from './function_mock_return_value'

jest.mock('./dependencies/get_all')

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      const itemOnSale = fakeItemBuilder().withPrice(9).build()
      const itemNotOnSale = fakeItemBuilder().withPrice(10).build()

      createTypedMockFunction(getAll).mockImplementation(() => [
        itemOnSale,
        itemNotOnSale,
      ])
      // Act
      const result = await getAllItemsOnSale()
      // Assert
      expect(result).toEqual([itemOnSale])
    })
  })
})

export function createTypedMockFunction(
  fn: any,
): jest.MockedFunction<typeof fn> {
  return fn as jest.MockedFunction<typeof fn>
}
