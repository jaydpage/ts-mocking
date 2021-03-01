import { testItemBuilder } from '../builders/test_item_builder'
import { InMemoryCache } from '../dependencies/InMemoryCache'
import { ItemRepository } from '../dependencies/ItemRepository'
import { PubSub } from '../dependencies/PubSub'
import { ItemProcessor } from './comprehensive_example'
import { createTypedMockClass } from './helpers/jest_typed_mock'

jest.mock('../dependencies/ItemRepository')
jest.mock('../dependencies/PubSub')

describe('ItemProcessor', () => {
  describe('processItems', () => {
    it('given a single unprocessed item will update the cache with the item', async () => {
      // Arrange
      const item = testItemBuilder().build()

      const mockItemRepository = createTypedMockClass(ItemRepository)
      mockItemRepository.getAll = jest.fn(() => [item])

      const fakePubSub = {
        publish: jest.fn(),
      }
      const mockPubSub = createTypedMockClass(PubSub)
      mockPubSub.getInstance = jest.fn(() => fakePubSub)

      const inMemoryCache = new InMemoryCache()
      const cacheUpdateSpy = jest.spyOn(inMemoryCache, 'update')
      const itemProcessor = new ItemProcessor(inMemoryCache, mockItemRepository)
      // Act
      await itemProcessor.processItems()
      // Assert
      expect(cacheUpdateSpy).toBeCalledWith(item)
    })

    it('given a single unprocessed item will publish a item updated message', async () => {
      // Arrange
      const item = testItemBuilder().build()

      const mockItemRepository = createTypedMockClass(ItemRepository)
      mockItemRepository.getAll = jest.fn(() => [item])

      const fakePubSub = {
        publish: jest.fn(),
      }
      const mockPubSub = createTypedMockClass(PubSub)
      mockPubSub.getInstance = jest.fn(() => fakePubSub)

      const inMemoryCache = new InMemoryCache()
      const itemProcessor = new ItemProcessor(inMemoryCache, mockItemRepository)
      // Act
      await itemProcessor.processItems()
      // Assert
      expect(fakePubSub.publish).toBeCalledWith('item:updated', item)
    })
  })
})
