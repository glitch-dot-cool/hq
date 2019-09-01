const { app, BrowserWindow, ipcMain, BrowserView } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow, view;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startURL = isDev
    ? `http://localhost:3000`
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

ipcMain.on("changeRoute", (event, args) => {
  // if the clicked route has a url (i.e. requires BrowserView)
  if (args !== null){
    setupBrowserView(args);
  } else {
    // if the clicked route does not require BrowserView, kill process
    view.destroy();
  }
});

const setupBrowserView = (url) => {
      view = new BrowserView();
      mainWindow.setBrowserView(view);
      view.setBounds({ x: 300, y: 0, width: 1620, height: 1080 });
      view.setAutoResize({
        width: true,
        height: true
      });
      view.webContents.loadURL(url);
}
