import { testItemBuilder } from './builders/test_item_builder'
import { InMemoryCache } from '../dependencies/InMemoryCache'
import { PubSub, PubSubChannels } from '../dependencies/PubSub'
import { ItemProcessor } from './comprehensive_example'
import {
  createTypedMockClass,
  spyOnAndMockReturnValues,
} from './helpers/jest_typed_mock'
import { mockItemRepositoryBuilder } from './builders/mock_item_repository_builder'
import { ItemRepository } from '../dependencies/ItemRepository'

jest.mock('../dependencies/PubSub')

describe('ItemProcessor', () => {
  describe('processItems', () => {
    const processInterval = 5000
    let fakePubSub: any

    beforeEach(() => {
      fakePubSub = {
        publish: jest.fn(),
      }
      const mockPubSub = createTypedMockClass(PubSub)
      mockPubSub.getInstance = jest.fn(() => fakePubSub)
    })

    it('will not process items if processing is already busy', async () => {
      const item = testItemBuilder().build()
      const mockItemRepository = mockItemRepositoryBuilder()
        .withGetAllReturning([item])
        .build()

      const {
        inMemoryCache,
        spy: cacheUpdateSpy,
        spyCalledOnce,
      } = createInMemoryCacheWithSpy()

      const itemProcessor = createSut(inMemoryCache, mockItemRepository)
      // Act
      itemProcessor.processItems()
      itemProcessor.processItems()
      // Assert
      await spyCalledOnce
      expect(cacheUpdateSpy).toBeCalledTimes(1)
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item])
          .build()

        const {
          inMemoryCache,
          spy: cacheUpdateSpy,
        } = createInMemoryCacheWithSpy()

        const itemProcessor = createSut(inMemoryCache, mockItemRepository)
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
        const itemProcessor = createSut(inMemoryCache, mockItemRepository)
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(fakePubSub.publish).toBeCalledWith(
          PubSubChannels.itemUpdated,
          item,
        )
      })

      it('does not process items that have already been processed', async () => {
        const item = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item])
          .build()

        const {
          inMemoryCache,
          spy: cacheUpdateSpy,
        } = createInMemoryCacheWithSpy()

        const itemProcessor = createSut(inMemoryCache, mockItemRepository)
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(fakePubSub.publish).toBeCalledWith(
          PubSubChannels.itemUpdated,
          item,
        )
        expect(cacheUpdateSpy).toBeCalledWith(item)

        await itemProcessor.processItems()
        expect(fakePubSub.publish).toHaveBeenCalledTimes(1)
        expect(cacheUpdateSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('given newly added unprocessed items', () => {
      it.skip('processes all newly added items every x seconds', async () => {
        // Arrange
        jest.useFakeTimers()
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()
        const item3 = testItemBuilder().build()
        const item4 = testItemBuilder().build()
        const item5 = testItemBuilder().build()

        // TODO: allow for mock item repository to fake out results of specific calls, nth call = result
        const itemRepository = new ItemRepository()

        const {
          inMemoryCache,
          spyCalledOnce,
          spyCalledTwice,
        } = createInMemoryCacheWithSpy()

        const itemProcessor = createSut(inMemoryCache, itemRepository)
        // Act
        itemRepository.insert(item1)
        itemProcessor.processItems()
        await spyCalledOnce
        // Assert
        expect(fakePubSub.publish).toHaveBeenCalledWith(
          PubSubChannels.itemUpdated,
          item1,
        )
        itemRepository.insert(item2)
        itemRepository.insert(item3)
        jest.advanceTimersByTime(processInterval)
        await spyCalledTwice
        expect(fakePubSub.publish).toHaveBeenCalledWith(
          PubSubChannels.itemUpdated,
          item2,
        )
        expect(fakePubSub.publish).toHaveBeenCalledWith(
          PubSubChannels.itemUpdated,
          item3,
        )
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item1, item2])
          .build()

        const {
          inMemoryCache,
          spy: cacheUpdateSpy,
        } = createInMemoryCacheWithSpy()

        const itemProcessor = createSut(inMemoryCache, mockItemRepository)
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(cacheUpdateSpy).toHaveBeenNthCalledWith(1, item1)
        expect(cacheUpdateSpy).toHaveBeenNthCalledWith(2, item2)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item1, item2])
          .build()

        const inMemoryCache = new InMemoryCache()
        const itemProcessor = createSut(inMemoryCache, mockItemRepository)
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(fakePubSub.publish).toHaveBeenNthCalledWith(
          1,
          PubSubChannels.itemUpdated,
          item1,
        )
        expect(fakePubSub.publish).toHaveBeenNthCalledWith(
          2,
          PubSubChannels.itemUpdated,
          item2,
        )
      })

      it('does not process items that have already been processed', async () => {
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()
        const mockItemRepository = mockItemRepositoryBuilder()
          .withGetAllReturning([item1, item2])
          .build()

        const {
          inMemoryCache,
          spy: cacheUpdateSpy,
        } = createInMemoryCacheWithSpy()

        const itemProcessor = createSut(inMemoryCache, mockItemRepository)
        // Act
        await itemProcessor.processItems()
        // Assert
        expect(fakePubSub.publish).toHaveBeenNthCalledWith(
          1,
          PubSubChannels.itemUpdated,
          item1,
        )
        expect(fakePubSub.publish).toHaveBeenNthCalledWith(
          2,
          PubSubChannels.itemUpdated,
          item2,
        )
        expect(cacheUpdateSpy).toHaveBeenNthCalledWith(1, item1)
        expect(cacheUpdateSpy).toHaveBeenNthCalledWith(2, item2)

        await itemProcessor.processItems()
        expect(fakePubSub.publish).toHaveBeenCalledTimes(2)
        expect(cacheUpdateSpy).toHaveBeenCalledTimes(2)
      })
    })

    function createSut(
      inMemoryCache: InMemoryCache,
      itemRepository: ItemRepository,
    ) {
      return new ItemProcessor(inMemoryCache, itemRepository)
    }

    function createInMemoryCacheWithSpy() {
      const inMemoryCache = new InMemoryCache()
      const spyResults = spyOnAndMockReturnValues(inMemoryCache, 'update', [])
      return { inMemoryCache, ...spyResults }
    }
  })
})
