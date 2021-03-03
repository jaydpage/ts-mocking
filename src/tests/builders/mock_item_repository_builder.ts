import { Item } from '../../dependencies/Item'
import { ItemRepository } from '../../dependencies/ItemRepository'
import { createTypedMockClass } from '../helpers/jest_typed_mock'

jest.mock('../../dependencies/ItemRepository')

export function mockItemRepositoryBuilder(): any {
  const mockItemRepository = createTypedMockClass(ItemRepository)
  const mockGetAll = jest.fn()
  mockItemRepository.getAll = mockGetAll

  const builder = {
    withGetAllReturning(items: Item[]) {
      mockGetAll.mockResolvedValue(items)
      return this
    },
    withGetAllReturningOnce(items: Item[]) {
      mockGetAll.mockResolvedValueOnce(items)
      return this
    },
    build(): ItemRepository {
      return mockItemRepository
    },
  }

  return builder
}
