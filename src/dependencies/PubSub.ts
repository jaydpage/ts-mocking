type Callback = (...params: any[]) => any

export class PubSub {
  private static instance: PubSub
  private subscriptions: Record<string, Callback[]>

  static getInstance() {
    if (!this.instance) {
      this.instance = new PubSub()
    }
    return this.instance
  }

  async publish(channel: string, payload: unknown) {
    console.log(`publishing ${payload} on channel ${channel}`)
    
    for (const callback of this.subscriptions[channel]) {
      callback(payload)
    }
  }

  async subscribe(channel: string, callback: Callback) {
    console.log(`subscribing to ${channel} with ${callback}`)

    this.subscriptions[channel] = [
      ...(this.subscriptions[channel] || []),
      callback,
    ]
  }
}
