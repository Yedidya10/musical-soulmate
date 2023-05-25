export function secureSetItem(key: string, value: string) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  } catch (e) {
    console.warn(`Failed to set localStorage item.`, e)
  }
}

export function secureGetItem(key: string) {
  try {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
  } catch (e) {
    console.warn(`Failed to get localStorage item.`, e)
    return null
  }
}
