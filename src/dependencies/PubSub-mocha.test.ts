import { default as sinon } from 'sinon'
import { PubSub } from './PubSub'
import { expect } from 'chai'

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subsription callback when publish occurs on channel', async () => {
      // Arrange
      const pubSub = PubSub.getInstance()
      const callback = sinon.stub()
      const callbackCalled = listenForCall(callback)
      const channel = 'fooBarChannel'
      const payload = { foo: 'bar' }
      await pubSub.subscribe(channel, callback)
      // Act
      await pubSub.publish(channel, payload)
      // Assert
      await callbackCalled
      expect(callback).to.have.been.calledWith(payload)
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      const pubSub = PubSub.getInstance()
      const callback1 = sinon.stub()
      const callback2 = sinon.stub()
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
      expect(callback1).to.have.been.calledWith(payload)
      await callback2Called
      expect(callback2).to.have.been.calledWith(payload)
    })
  })
})

export async function listenForCall(callback: sinon.SinonStub) {
  return new Promise<void>((resolve) => {
    callback.callsFake(() => resolve())
  })
}
