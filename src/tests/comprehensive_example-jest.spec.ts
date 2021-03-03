import { testItemBuilder } from './builders/test_item_builder'
import { InMemoryCache } from '../dependencies/InMemoryCache'
import { PubSub } from '../dependencies/PubSub'
import { ItemProcessor } from './comprehensive_example'
import { createTypedMockClass } from './helpers/jest_typed_mock'
import { mockItemRepositoryBuilder } from './builders/mock_item_repository_builder'

jest.mock('../dependencies/PubSub')

describe('ItemProcessor', () => {
  describe('processItems', () => {
    let fakePubSub: any

    beforeEach(() => {
      fakePubSub = {
        publish: jest.fn(),
      }
      const mockPubSub = createTypedMockClass(PubSub)
      mockPubSub.getInstance = jest.fn(() => fakePubSub)
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item])
          .build()

        const { inMemoryCache, cacheUpdateSpy } = createInMemoryCacheWithSpy()
        const itemProcessor = new ItemProcessor(
          inMemoryCache,
          mockItemRepository,
        )
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(cacheUpdateSpy).toBeCalledWith(item)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item])
          .build()

        const inMemoryCache = new InMemoryCache()
        const itemProcessor = new ItemProcessor(
          inMemoryCache,
          mockItemRepository,
        )
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(fakePubSub.publish).toBeCalledWith('item:updated', item)
      })

      it('does not process items that have already been processed', async () => {
        const item = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item])
          .build()

        const { inMemoryCache, cacheUpdateSpy } = createInMemoryCacheWithSpy()
        const itemProcessor = new ItemProcessor(
          inMemoryCache,
          mockItemRepository,
        )
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(fakePubSub.publish).toBeCalledWith('item:updated', item)
        expect(cacheUpdateSpy).toBeCalledWith(item)

        await itemProcessor.processItems()
        expect(fakePubSub.publish).toHaveBeenCalledTimes(1)
        expect(cacheUpdateSpy).toHaveBeenCalledTimes(1)
      })
    })

    function createInMemoryCacheWithSpy() {
      const inMemoryCache = new InMemoryCache()
      const cacheUpdateSpy = jest.spyOn(inMemoryCache, 'update')
      return { inMemoryCache, cacheUpdateSpy }
    }
  })
})
