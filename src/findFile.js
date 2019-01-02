'use strict'

const path = require('path')
const fs = require('fs')

/**
 * 递归查找文件
 * @param filePath
 * @param callback
 */
module.exports = function findFile (filePath, callback) {
  fs.readdir(filePath, function (err, files) {
    if (err) return callback(err)

    files.forEach(function (filename) {
      const filedir = path.join(filePath, filename)

      fs.stat(filedir, function (eror, stats) {
        if (eror) return callback(eror)

        // 文件
        if (stats.isFile()) return callback(null, filedir)

        //文件夹递归
        if (stats.isDirectory()) return findFile(filedir, callback)
      })
    })
  })
}
