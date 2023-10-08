
const fs = require('fs')

const checkFileType = function(src) {
    return new Promise((resolve, reject) => {
        fs.stat(src, function(err, status) {
            if(err) {
                reject(err)
                return
            } else {
                resolve(status)
            }
        })
    })
}

const readFile = (name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + name, { flag: 'r+', encoding: 'utf8' }, function (err, data) {
            if(err) return reject(err);
            else return resolve(data)
        });
    })
}

const creatDirectory = (name) => {
    fs.mkdir(__dirname + '/' + name, function(err) {
        console.log('根目录', __dirname)
        if(err) {
            console.log('error ')
            return
        }
        console.log('created')
    })
}

const writeFile = (fileName, content) => {
    fs.writeFile(__dirname +'/'+ fileName, content + '\n', function(err) {
        if(err) {
            console.log('write failed', err)
            return false
        }
        console.log('write success')
    })
}

const appendFile = (fileName, content) => {
    fs.appendFile(__dirname + '/' + fileName, content, 'utf8', function(err) {
        if(err) {
            console.log('appendfile fialed')
            return
        }
        console.log('appendfile success')
    })
}

const readDir = (dir) => {
    fs.readdir(__dirname + '/' + dir, function(err, data) {
        if(err) {
            console.log('readDir failed')
            return
        }
        console.log('readDir success', data)
    })
}

const reName = (oldName, newName) => {
    fs.rename(oldName, newName, function(err) {
        if(err) {
            console.log('rename failed')
            return
        }
        console.log('rename success')
    })
}

// 删除目录
const rmDir = (dirname) => {
    fs.rmdir(__dirname + '/' + dirname, function(err) {
        if(err) {
            console.log('remove directory failed')
            return
        }
        console.log('remove directory success')
    })
}

// 删除文件
const unlink = (fileName) => {
    fs.unlink(fileName, function(err) {
        if(err) {
            console.log('remove file failed')
            return
        }
        console.log('remove file success')
    })
}

module.exports = {
    checkFileType,
    readFile,
    creatDirectory,
    writeFile,
    appendFile,
    readDir,
    reName,
    rmDir,
    unlink,
}