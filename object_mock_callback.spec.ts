interface Payload {
  id: string
  amount: number
  callback: (result: string) => void
}

function execute(payload: Payload) {
  const result = payload.amount * 10
  payload.callback(`${result} for ${payload.id}`)
  return result
}

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
