import { execute } from './object_callback'

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: jest.fn(),
      }
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toBeCalled()
    })

    it('calls the callback once', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: jest.fn(),
      }
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toBeCalledTimes(1)
    })

    it('calls the callback with correct value', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: jest.fn(),
      }
      // Act
      execute(payload)
      // Assert
      const expected = '20 for 1'
      expect(payload.callback).toBeCalledWith(expected)
    })
  })
})
