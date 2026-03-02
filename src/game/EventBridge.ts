type EventCallback = (...args: any[]) => void

interface EventMap {
  openSection: [section: string]
  closeSection: []
  navigateTo: [scene: string]
}

class EventBridge {
  private listeners = new Map<string, Set<EventCallback>>()

  on<K extends keyof EventMap>(event: K, callback: (...args: EventMap[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback as EventCallback)
  }

  off<K extends keyof EventMap>(event: K, callback: (...args: EventMap[K]) => void): void {
    this.listeners.get(event)?.delete(callback as EventCallback)
  }

  emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): void {
    this.listeners.get(event)?.forEach((cb) => cb(...args))
  }
}

export const eventBridge = new EventBridge()
