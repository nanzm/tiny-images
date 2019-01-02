'use strict'

const path = require('path')
const fs = require('fs')

/**
 *
 * @param filePath
 */
function findFile (filePath) {
  return new Promise((resolve, reject) => {
    const fileArray = []

    fs.readdir(filePath, function (err, files) {
      if (err) return reject(err)

      files.forEach(function (filename) {
        const filedir = path.join(filePath, filename)
        const stats = fs.statSync(filedir)
        if (stats.isFile()) return fileArray.push(filedir)
      })

      resolve(fileArray)
    })
  })
}

module.exports = findFile

