'use strict'

const path = require('path')
const fs = require('fs-extra')
const tinify = require('tinify')
const question = require('./question')
const findFile = require('./findFile')
const filePath = process.env.HOME + '/.tinypng'
const pwdPath = process.env.PWD

async function main () {
  try {
    // 获取key
    let keyObj
    const data = await fs.readJson(filePath, { throws: false })
    if (data) {
      keyObj = data
    } else {
      const answers = await question()
      await fs.outputJson(filePath, answers)
      keyObj = answers
    }

    // 去压缩
    tinify.key = keyObj.APIKey

    findFile(pwdPath, async (err, file) => {
      if (err) return console.error(err)

      const ext = path.extname(file)
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        console.log(file)

        const source = tinify.fromFile(file)

        await fs.ensureDir(pwdPath + '/tiny')

        const time = Date.now()
        source.toFile(pwdPath + '/tiny/' + time + ext)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

main()
