export function createTypedMockClass(cls: any): jest.MockedClass<typeof cls> {
  return cls as jest.MockedClass<typeof cls>
}
