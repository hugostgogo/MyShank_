console.log("PRELOAD -------------------")

console.log(window)

const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        invoke: async (channel, data) => {
           const response = await ipcRenderer.invoke(channel, data)
           return new Promise((resolve, reject) => {
                 resolve(response)
           })
        },
        send: (channel, data) => {
           ipcRenderer.send(channel, data)
        },
        receive: (channel, func) => {
           ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
);

console.log("---------------------------")
