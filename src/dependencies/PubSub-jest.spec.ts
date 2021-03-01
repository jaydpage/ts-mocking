import { listenForCall } from '../tests/jest_typed_mock'
import { PubSub } from './PubSub'

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subsription callback when publish occurs on channel', async () => {
      // Arrange
      const pubSub = PubSub.getInstance()
      const callback = jest.fn()
      const callbackCalled = listenForCall(callback)
      const channel = 'fooBarChannel'
      const payload = { foo: 'bar' }
      await pubSub.subscribe(channel, callback)
      // Act
      await pubSub.publish(channel, payload)
      // Assert
      await callbackCalled
      expect(callback).toHaveBeenCalledWith(payload)
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      const pubSub = PubSub.getInstance()
      const callback1 = jest.fn()
      const callback2 = jest.fn()
      const callback1Called = listenForCall(callback1)
      const callback2Called = listenForCall(callback2)
      const channel = 'fooBarChannel'
      const payload = { foo: 'bar' }
      await pubSub.subscribe(channel, callback1)
      await pubSub.subscribe(channel, callback2)
      // Act
      await pubSub.publish(channel, payload)
      // Assert
      await callback1Called
      expect(callback1).toHaveBeenCalledWith(payload)
      await callback2Called
      expect(callback2).toHaveBeenCalledWith(payload)
    })
  })
})
