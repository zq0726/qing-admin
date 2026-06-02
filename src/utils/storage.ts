export function getStorage<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

export function setStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorage(key: string): void {
  localStorage.removeItem(key)
}

export function clearStorage(): void {
  localStorage.clear()
}
