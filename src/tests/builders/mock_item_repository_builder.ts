import { Item } from '../../dependencies/Item'
import { ItemRepository } from '../../dependencies/ItemRepository'
import { createTypedMockClass } from '../helpers/jest_typed_mock'

jest.mock('../../dependencies/ItemRepository')

export function mockItemRepositoryBuilder(): any {
  const mockItemRepository = createTypedMockClass(ItemRepository)

  const builder = {
    withGetAllReturning(items: Item[]) {
      mockItemRepository.getAll = jest.fn(() => items)
      return this
    },
    build(): ItemRepository {
      return mockItemRepository
    },
  }

  return builder
}
