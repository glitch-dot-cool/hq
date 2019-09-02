const electron = require("electron");
const { app, BrowserWindow, ipcMain, BrowserView } = electron;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow, view;

const createWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    icon: setIconByOS(),
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startURL = isDev
    ? `http://localhost:3000`
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => {
    // check OS and use maximize or show
    if (process.platform === "darwin") {
      mainWindow.show();
    } else {
      mainWindow.maximize();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

ipcMain.on("changeRoute", (event, url) => {
  // if the clicked route has a url (i.e. requires BrowserView)
  if (url !== null) {
    let window = mainWindow.getBounds();
    setupBrowserView(url, window.width, window.height);
  } else {
    // if the clicked route does not require BrowserView and there is an active BrowserView, kill it
    if (view !== undefined && view !== null){
      view.destroy();
    }
  }
});

const setupBrowserView = (url, width, height) => {
  view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 300, y: 0, width: width-300, height: height });
  view.setAutoResize({
    width: true,
    height: true
  });
  view.webContents.loadURL(url);
};

app.on("ready", createWindow);

// quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const setIconByOS = () => {
  if (process.platform === "darwin") {
    console.log("detected mac host");
    return path.join(
      __dirname,
      "../",
      "src/assets/icons/icon.icns"
    );
  } else if (process.platform === "linux") {
    console.log("detected linux host");
    return path.join(
      __dirname,
      "../",
      "src/assets/icons/64x64.png"
    );
  } else if (process.platform === "win32") {
    console.log("detected windows host");
    return path.join(
      __dirname,
      "../",
      "src/assets/icons/icon.ico"
    );
  }
};
