import { ipcRenderer } from "electron"

const BG_COLOR_KEY = "bg-color"
const CHANNEL_KEY = "channel"
const TOKEN_KEY = "token"

const getChannel = async (token) => {
  const headers = new Headers()
  headers.append("Authorization", `OAuth ${token}`)

  const res = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers,
  })
  const data = await res.json()

  return data.login
}

const storeUser = ({ token, channel }) => {
  storeToken(token)
  storeChannel(channel)
}

const storeToken = (token) => localStorage.setItem(TOKEN_KEY, token)
const storeChannel = (channel) => localStorage.setItem(CHANNEL_KEY, channel)

const refreshUser = async () => {
  const token = await ipcRenderer.invoke("sign-in")
  const channel = await getChannel(token)
  storeUser({ token, channel })
}

const validateStoredUser = async () => {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers = new Headers()
  headers.append("Authorization", `OAuth ${token}`)

  const res = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers,
  })
  const data = await res.json()

  if ("message" in data) return false

  return true
}

const init = async () => {
  if (!(await validateStoredUser())) await refreshUser()

  const token = localStorage.getItem(TOKEN_KEY)
  const channel = localStorage.getItem(CHANNEL_KEY)

  ipcRenderer.invoke("request-message", { token, channel })
}

const appendMessage = ({ id, message }) => {
  const p = document.createElement("p")
  p.innerText = `<${id}>: ${message}`
  p.style.fontSize = `${getFontSize()}rem`
  p.draggable = false

  document.body.appendChild(p)
  window.scrollTo(0, document.body.scrollHeight)
}

ipcRenderer.on("message", (_, message) => {
  appendMessage(message)
})

const removeLoadingText = () => {
  document.getElementById("loading-text").style.display = "none"
}

const cleanUpTexts = () => {
  document.querySelectorAll("p").forEach((element) => {
    element.remove()
  })
}

const fontSizeInput = document.getElementById("font-size-input")
const testText = document.getElementById("test-text")
const settingWindow = document.getElementById("setting-window")
const closeButton = document.getElementById("close-button")

const FONT_KEY = "font"

const setTestFontSize = (value) => {
  testText.style.fontSize = `${value}rem`
}

const storeFontSize = (value) => {
  localStorage.setItem(FONT_KEY, String(value))
}

const getFontSize = () => {
  const font = localStorage.getItem(FONT_KEY)

  if (font) return font

  localStorage.setItem(FONT_KEY, "1.6")

  return "1.6"
}

fontSizeInput.addEventListener("input", () => {
  setTestFontSize(fontSizeInput.value)
  storeFontSize(fontSizeInput.value)
})

closeButton.addEventListener("click", () => {
  settingWindow.style.display = "none"
})

ipcRenderer.on("open-setting", () => {
  settingWindow.style.display = "flex"
})

const main = async () => {
  await init()
  removeLoadingText()

  setTestFontSize(getFontSize())
  fontSizeInput.value = getFontSize()

  setInterval(cleanUpTexts, 1000 * 60 * 5)
  setInterval(validateStoredUser, 1000 * 60 * 60)
}

main()

const bgColor = new Proxy(
  { bgColor: localStorage.getItem(BG_COLOR_KEY) ?? "#00000033" },
  {
    set(object, propertyName, value) {
      if (propertyName == "bgColor" && typeof value !== "string") return false

      localStorage.setItem(BG_COLOR_KEY, value)
      document.body.style.backgroundColor = value

      return Reflect.set(object, propertyName, value)
    },
  }
)

document.body.style.backgroundColor = bgColor.bgColor

const picker = Pickr.create({
  el: ".color-picker",
  theme: "nano",
  swatches: [],
  default: localStorage.getItem("bg-color") ?? "#00000033",
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: false,
      rgba: false,
      hsla: false,
      hsva: false,
      cmyk: false,
      input: true,
      clear: false,
      save: true,
    },
  },
})

picker.on("save", (color, _) => {
  bgColor.bgColor = color.toHEXA().toString()
})
