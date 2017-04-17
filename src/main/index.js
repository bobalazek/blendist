const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');
const config = require('../core/config');

let mainWindow;

function createMainWindow () {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 800,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../web/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    if (config.env === 'dev') {
        mainWindow.webContents.openDevTools();
        require('electron-connect').client.create(mainWindow);
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    require('./menu');

	createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});
