'use strict'
const { spawn, execSync } = require("child_process");
const { Readable } = require("stream")
const { unlink } = require('fs')
const path = require("path")

const childDir = path.join(__dirname, 'src')

//*TODO:
/// process to check install of wirepi and install

execSync('gcc -Wall -o a mpu.c main.c -lwiringPi', {
    'cwd': childDir
}, (err, stdout, stderr) => {
    if(!err) {
        console.log('subprocess stdout: ', stdout.toString())
        console.log('subprocess stderr: ', stderr.toString())
        spawnA()
    } else {
        console.error("Subprocess error: ", err)
    }
})


function spawnA(){
    const child = spawn('./a', {} ,{
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

