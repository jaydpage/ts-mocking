export function createTypedMockClass(cls: any): jest.MockedClass<typeof cls> {
  return cls as jest.MockedClass<typeof cls>
}

export function createTypedMockFunction(
  fn: any,
): jest.MockedFunction<typeof fn> {
  return fn as jest.MockedFunction<typeof fn>
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T] &
  string

export function spyOnAndMockReturnValues<
  T extends {},
  M extends FunctionPropertyNames<Required<T>>
>(object: T, method: M, returnValues: unknown[]) {
  let callCount = 0

  const mockFirstCall = jest.fn()
  const mockSecondCall = jest.fn()
  const mockThirdCall = jest.fn()

  const spy = jest
    .spyOn(object, method)
    .mockImplementationOnce(mockFirstCall)
    .mockImplementationOnce(mockSecondCall)
    .mockImplementationOnce(mockThirdCall)

  const spyCalledOnce = listenForCall(1, mockFirstCall, returnValues[0])
  const spyCalledTwice = listenForCall(2, mockSecondCall, returnValues[1])
  const spyCalledThrice = listenForCall(3, mockThirdCall, returnValues[2])

  return {
    spy,
    spyCalledOnce,
    spyCalledTwice,
    spyCalledThrice,
  }

  async function listenForCall(
    callNumber: number,
    fn: jest.Mock,
    mockedReturnValue?: unknown,
  ) {
    return new Promise<void>((resolve) => {
      fn.mockImplementation(() => {
        callCount++
        if (callCount === callNumber) {
          resolve()
          if (mockedReturnValue !== undefined) {
            return mockedReturnValue
          }
        }
      })
    })
  }
}

export async function listenForCall(callback: jest.Mock) {
  return new Promise<void>((resolve) => {
    callback.mockImplementation(() => {
      resolve()
    })
  })
}
