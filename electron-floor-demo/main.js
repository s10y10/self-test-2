const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
app.commandLine.appendSwitch("remote-debugging-port", "8315");
function createWindow() {
  const win = new BrowserWindow({
    useContentSize: true,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
  win.on("ready-to-show", () => {
    win.setAlwaysOnTop(true, "pop-up-menu");
  });
}
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on(
  "change-window-size",
  (event, { difX, difY, winWidth, winHeight }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const { x, y } = win.getBounds();
    console.log(difX, difY, x, y, winWidth, winHeight);
    if (difX || difY) {
      win.setBounds({ x: x + difX, y: y + difY });
    }
    if (winWidth && winHeight) {
      win.setBounds({ width: winWidth, height: winHeight });
    }
  }
);
