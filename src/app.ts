import { app, BrowserWindow, ipcMain } from "electron"

const createChatWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    frame: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
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

  win.loadFile("screens/index.html")
}

app.whenReady().then(() => {
  createChatWindow()
  // createSettingWindow()
})
