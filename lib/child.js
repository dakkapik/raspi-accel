const { rejects } = require("assert");
const { spawn, exec } = require("child_process");
const path = require("path");

const lib = {}

lib.baseDir = path.resolve(path.join(__dirname,'..','src'))

//*TODO:
/// process to check install of wirepi and install

lib.runBuild = function () {
    return new Promise((resolve, rejects) => {
        exec('gcc -Wall -o a mpu.c main.c -lwiringPi', {
            'cwd': lib.baseDir
        }, (err, stdout, stderr) => {
            if(!err) {
                console.log('subprocess stdout: ', Buffer.from(stdout).toString())
                console.log('subprocess stderr: ', Buffer.from(stderr).toString())
                resolve()
            } else {
                rejects("Subprocess error: ", err)
            }
    
        })
    })
}



lib.startListener = function( socket ){
    console.log('\x1b[32m%s\x1b[0m', "SPAWING A")

    const child = spawn('a', [] ,{

        stdio: ['ignore', 'pipe', 'inherit'],
        cwd: lib.baseDir
        
    })

    child.stdout.pipe(process.stdout)
    
    child.on('data', (data)=> {
        console.log(data)
    })

}

module.exports = lib;