'use strict'
const { spawn, exec } = require("child_process");
const { Readable } = require("stream")
const { unlink } = require('fs')
const path = require("path")

const childDir = path.join(__dirname, 'src')

//*TODO:
/// process to check install of wirepi and install

exec('gcc -Wall -o a mpu.c main.c -lwiringPi', {
    'cwd': childDir
}, (err, stdout, stderr) => {
    if(!err) {
        spawnA()
        console.log('subprocess stdout: ', Buffer.from(stdout).toString())
        console.log('subprocess stderr: ', Buffer.from(stderr).toString())
    } else {
        console.error("Subprocess error: ", err)
    }
})


function spawnA(){
    console.log('\x1b[32m%s\x1b[0m', "SPAWING A")
    const child = spawn('./a', [] ,{
        // stdio: ['ignore', 'pipe', 'inherit'],
        cwd: childDir
    })
    
    // const readStream = Readable.from(child.stdout)

    child.stdout.pipe(process.stdout)

    child.on("data", (data)=> {
        console.log(data.toString())
    })
    
    child.on('error', (err) => {
        console.error("child spawn error: ",err)
    })

    child.on("close", () => {
        console.log("stream closed")
        //cleanup
        // unlink(path.join(childDir, 'a'), (err) => {
        //     if(!err) {
                // console.log("clean up successfull..")
        //     } else {
        //         console.error("error on cleanup: ", err)
        //     }
        // })
    })
}

