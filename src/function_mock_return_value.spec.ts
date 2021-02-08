import { getAll } from './dependencies/get_all'
import { getAllItemsOnSale } from './function_mock_return_value'

jest.mock('./dependencies/get_all')

describe('getAllItemsOnSale', () => {
  it('returns only prices under 10', async () => {
    // Arrange
    const itemOnSale = {
      id: '1',
      name: 'foo',
      price: 9,
      description: '',
    }
    const itemNotOnSale = {
      id: '1',
      name: 'foo',
      price: 10,
      description: '',
    }

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

export function createTypedMockFunction(
  fn: any,
): jest.MockedFunction<typeof fn> {
  return fn as jest.MockedFunction<typeof fn>
}
