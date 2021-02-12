import { Item } from "./Item";

export class InMemoryCache {
  update(item: Item) {
      console.log(`cache successfully updated with ${item}`)
  }
}
