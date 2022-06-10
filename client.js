const { io } = require("socket.io-client")
const fs = require("fs")

const socket = io ("http://192.168.0.210:5000")

socket.on("connect",() => {
    socket.emit("purpose", "giro")
})

setInterval(()=> {
    const giro = fs.readFileSync("gyro.json")
    socket.emit("gyro-raw-output", giro)
}, 100)


