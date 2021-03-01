export interface Payload {
  id: string
  amount: number
  callback: (result: string) => void
}

export function execute(payload: Payload) {
  const result = payload.amount * 10
  payload.callback(`${result} for ${payload.id}`)
  return result
}
