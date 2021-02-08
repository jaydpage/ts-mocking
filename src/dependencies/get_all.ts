export interface Item {
  id: string
  name: string
  price: number
  description: string
}

export async function getAll(): Promise<Item[]> {
  return []
}
