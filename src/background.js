'use strict'

import electron, { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

import { ipcMain, ipcRenderer } from 'electron'
import store from '@/store'

import { execSync } from "child_process"

import rpio from 'rpio'

const path = require('path')


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 640,
    height: 480,
    fullscreen: true,
    width: 641,
    height: 480,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    },
  })

  await win.webContents.session.clearCache()

  process.setMaxListeners(0);

  win.setMenu(null);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// CUSTOM

let isInFunction = false

ipcMain.handle('setSource', (event, pin) => {
  rpio.open(16, rpio.OUTPUT, rpio.LOW)
  rpio.open(18, rpio.OUTPUT, rpio.LOW)
  rpio.open(22, rpio.OUTPUT, rpio.LOW)

  rpio.write(22, rpio.LOW)
  rpio.write(18, rpio.LOW)
  rpio.write(16, rpio.LOW)

  rpio.write(pin, rpio.HIGH)

  return { phono: rpio.read(16), lineIn: rpio.read(18), feedBack: rpio.read(22), }
})

function run(cwd, command) {
  return execSync(command, { cwd, encoding: "utf8" })
}

function getADC(heating, speed) {
  let returnObj = {}
  if (heating) {
    run(undefined, "cat /sys/bus/iio/devices/iio\:device0/in_voltage0_raw")
    const rawValue = run(undefined, "cat /sys/bus/iio/devices/iio\:device0/in_voltage0_raw")
    let rangeValue = parseInt(rawValue * 100 / 1024)
    if (rangeValue < 0) rangeValue = 0
    if (rangeValue >= 99) rangeValue = 100
    returnObj.heating = rangeValue
  }
  if (speed) {
    run(undefined, "cat /sys/bus/iio/devices/iio\:device0/in_voltage1_raw")
    const rawValue = run(undefined, "cat /sys/bus/iio/devices/iio\:device0/in_voltage1_raw")
    let rangeValue = parseInt(rawValue * 100 / 1024)
    if (rangeValue < 0) rangeValue = 0
    if (rangeValue > 100) rangeValue = 100
    if (!isInFunction) run(undefined, `gpio pwm 26 ${parseInt(rangeValue * 10.24 / 11)}`)
    returnObj.speed = rangeValue
  }
  return returnObj
}

ipcMain.handle('getADC',(event, heating, speed) => {
  var res = getADC(heating, speed)
  return res
})

ipcMain.on('setHeating', (event, state) => {
  rpio.init()
  rpio.open(24, rpio.OUTPUT)
  rpio.write(24, state ? rpio.HIGH : rpio.LOW)
})

ipcMain.handle('stopSpeed', (event) => {
  run(undefined, "gpio mode 26 pwm")
  run(undefined, "gpio pwm 26 0")
})

ipcMain.on('leadIn', (event, delay) => {
  isInFunction = true
  run(undefined, "gpio mode 26 pwm")
  run(undefined, "gpio pwm 26 1024")
  setTimeout(() => {
    run(undefined, "gpio pwm 26 0")
    isInFunction = false
  }, delay)
})

ipcMain.on('space', (event, delay) => {
  isInFunction = true
  run(undefined, "gpio mode 26 pwm")
  run(undefined, "gpio pwm 26 1024")
  setTimeout(() => {
    run(undefined, "gpio pwm 26 0")
    isInFunction = false
  }, delay)
})
