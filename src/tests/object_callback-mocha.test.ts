import { expect } from 'chai'
import sinon from 'sinon'
import { execute } from './object_callback'

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: sinon.stub(),
      }
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).to.be.called
    })

    it('calls the callback once', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: sinon.stub(),
      }
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).to.be.calledOnce
    })

    it('calls the callback with correct value', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: sinon.stub(),
      }
      // Act
      execute(payload)
      // Assert
      const expected = '20 for 1'
      expect(payload.callback).to.be.calledWith(expected)
    })
  })
})
