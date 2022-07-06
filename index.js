'use strict'
const { io } = require("socket.io-client")

const child = require("./lib/child")
const config = require("./lib/config")
const device = "gyro"

const brainURL = new URL("http://"+config.mainIP + ":"+config.httpPort)

const socket = io (brainURL.href)

socket.on("connect",() => {
    socket.emit("purpose", device)
})

child.runBuild()
.then( child.startListener(socket) )
.catch((err) => socket.emit("error", {device, err}))


// socket.on("init-gyro", () => {
//     child.runBuild()

//     .then( child.startListener(socket) )

//    .catch((err) => socket.emit("error", {device, err}))
// })


