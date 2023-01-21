type Listener = {
  [key: string]: Function[];
}

class EventBus {
  private listeners: Listener

  constructor() {
    this.listeners = {}
  }

  public on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  public off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
  }

  public emit(event: string, ...args): never | void {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}

export default EventBus
