import { PubSub } from './PubSub'

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls provided callback when publish occurs on subscribed channel', async () => {
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
  })
})

async function listenForCall(callback: jest.Mock) {
  return new Promise<void>((resolve) => {
    callback.mockImplementation(() => {
      resolve()
    })
  })
}
