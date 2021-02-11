export function createTypedMockClass(cls: any): jest.MockedClass<typeof cls> {
  return cls as jest.MockedClass<typeof cls>
}

export function createTypedMockFunction(
  fn: any,
): jest.MockedFunction<typeof fn> {
  return fn as jest.MockedFunction<typeof fn>
}
