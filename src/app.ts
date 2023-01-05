import { app, BrowserWindow, globalShortcut, ipcMain } from "electron"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

const createChatWindow = () => {
  const sizeFilePath = join(app.getPath("userData"), "charla-size.json")
  const { width, height } = existsSync(sizeFilePath)
    ? JSON.parse(readFileSync(sizeFilePath).toString("utf8"))
    : { width: 800, height: 400 }

  // 800x400 default

  const win = new BrowserWindow({
    width,
    height,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.on("resized", () => {
    const [width, height] = win.getSize()

    writeFileSync(sizeFilePath, JSON.stringify({ width, height }))
  })

  ipcMain.handle(
    "sign-in",
    () =>
      new Promise((resolve, reject) => {
        const OauthWin = new BrowserWindow({
          width: 600,
          height: 500,
        })

        OauthWin.loadURL(
          "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=pc6ojm41czbrk6mkmt60cqotlb4qqt&scope=chat:read&redirect_uri=http%3A%2F%2Flocalhost%3A4000"
        )

        OauthWin.webContents.on("will-navigate", (_, url) => {
          const newUrl = new URL(url)
          const accessToken = newUrl.hash
            .split("&")[0]
            .replace("#access_token=", "")

          OauthWin.close()

          resolve(accessToken)
        })
      })
  )

  globalShortcut.register("F10", () => {
    win.webContents.send("open-setting")
  })

  win.loadFile("screens/index.html")
}

app.whenReady().then(() => {
  createChatWindow()
})
