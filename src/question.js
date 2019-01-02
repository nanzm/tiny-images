'use strict'

const inquirer = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'APIKey',
    message: 'What\'s your tinypng API Key ?',
    validate: function (value) {

      if (value.length === 32) {
        return true
      }

      return 'Please enter a valid API Key'
    }
  }
]

// inquirer.prompt(questions).then(answers => {
//   console.log(JSON.stringify(answers, null, '  '))
// })

module.exports = function () {
  return inquirer.prompt(questions)
}
