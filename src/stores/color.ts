import { writable } from "svelte/store"

export const color = writable(localStorage.getItem("color") ?? "#000")

color.subscribe((newColor) => {
  if (!("localStorage" in window)) return
  localStorage.setItem("color", newColor)
})
