import { writable } from "svelte/store"

export type PreferencesType = {
  fontSize: number
  messageFormat: string
  /**
   * Hex(8)
   */
  backgroundColor: string
  channel: string
}

export const preferences = writable<PreferencesType | null>(null)

preferences.subscribe((newPreferences) => {
  if (newPreferences) localStorage.preferences = JSON.stringify(newPreferences)
})
