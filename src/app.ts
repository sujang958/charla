import { app, BrowserWindow } from "electron"

const createChatWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    frame: false,
    transparent: true,
  })

  win.loadFile("screens/index.html")
}

const createSettingWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 220,
    resizable: false,
  })

  win.loadFile("screens/setting.html")
}

app.whenReady().then(() => {
  createChatWindow()
  createSettingWindow()
})
