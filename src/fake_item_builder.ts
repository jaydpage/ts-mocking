import { Item } from './dependencies/Item'

export function fakeItemBuilder(): any {
  const item: Item = {
    id: '',
    name: '',
    price: 0,
    description: '',
    created: new Date(),
  }

  const builder = {
    withId(value: string) {
      item.id = value
      return this
    },
    withName(value: string) {
      item.name = value
      return this
    },
    withPrice(value: number) {
      item.price = value
      return this
    },
    withDescription(value: string) {
      item.description = value
      return this
    },
    withCreated(value: Date) {
      item.created = value
      return this
    },
    build(): Item {
      return item
    },
  }

  return builder
}
