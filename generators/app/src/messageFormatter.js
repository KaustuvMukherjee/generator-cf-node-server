/*
 * Class - MessageFormatter
 */
'use strict'
const chalk = require('chalk')

class MessageFormatter {
    static greetUser() {
        let statements = [
            {text: ' ',
                formattedText: chalk.green.bold(' ')},
            {text: 'Welcome to cf-node-server !!',
                formattedText: chalk.green.bold('Welcome to cf-node-server !!')},
            {text: 'A yeoman generator plugin for NodeJS micro-service scaffolding.',
                formattedText: chalk.green.bold('A yeoman generator plugin for NodeJS micro-service scaffolding.')},
            {text: ' ',
                formattedText: chalk.green.bold(' ')},
            {text: 'Highlights:',
                formattedText: chalk.yellow.bold('Highlights:')},
            {text: '    - Supports OpenAPI Specification V3.',
                formattedText: chalk.yellow.bold('    - Supports OpenAPI Specification V3.')},
            {text: '    - Provides out-of-the-box \'/health\' API.',
                formattedText: chalk.yellow.bold('    - Provides out-of-the-box \'/health\' API.')},
            {text: '    - Provides sample GET, PUT, POST request based on OpenAPI Specification V3.',
                formattedText: chalk.yellow.bold('    - Provides sample GET, PUT, POST request based on OpenAPI Specification V3.')},
            {text: '    - Auto generates stubs (controller & service classes) based on Open API Specification V3.',
                formattedText: chalk.yellow.bold('    - Auto generates stubs (controller & service classes) based on Open API Specification V3.')},
            {text: '    - Ready to deploy on Cloud Foundry.',
                formattedText: chalk.yellow.bold('    - Ready to deploy on Cloud Foundry.')},
            {text: ' ',
                formattedText: chalk.green.bold(' ')}
        ]

        let padding = 10
        let maxLength = MessageFormatter.maxLength(statements) + 2*padding
        MessageFormatter.initialLine(maxLength)
        statements.forEach((statement) => {
            MessageFormatter.statementLine(maxLength, padding, statement)
        })
        MessageFormatter.finalLine(maxLength)
    }
    static noteToUser() {
        let statements = [
            {text: ' ',
                formattedText: chalk.green.bold(' ')},
            {text: 'Important Note:',
                formattedText: chalk.red.bold('Important Note:')},
            {text: 'node-express-server includes husky.',
                formattedText: chalk.yellow.bold('node-express-server') + chalk.green.bold(' includes husky.')},
            {text: 'Husky requires .git to install GIT hooks.',
                formattedText: chalk.green.bold('Husky requires') + chalk.yellow.bold(' .git') + chalk.green.bold(' to install GIT hooks.')},
            {text: 'Please run \'git init\' to create an empty Git repository followed by npm install.',
                formattedText: chalk.green.bold('Please run') +
                                chalk.yellow.bold(' \'git init\'') +
                                chalk.green.bold(' to create an empty Git repository followed by') +
                                chalk.yellow.bold(' npm install.')},
            {text: ' ',
                formattedText: chalk.green.bold(' ')}
        ]

        let padding = 10
        let maxLength = MessageFormatter.maxLength(statements) + 2*padding
        MessageFormatter.initialLine(maxLength)
        statements.forEach((statement) => {
            MessageFormatter.statementLine(maxLength, padding, statement)
        })
        MessageFormatter.finalLine(maxLength)
    }
    static maxLength(statements) {
        let maxLength = 0
        statements.forEach((statement) => {
            if(statement.text.length > maxLength) {
                maxLength = statement.text.length
            }
        })
        return maxLength
    }
    static initialLine(length) {
        let line = ''
        let i = 0
        line += '\n\n\n'
        while(i < length) {
            line += `${chalk.red.bold('*')}`
            i += 1
        }
        console.log(line)
    }
    static finalLine(length) {
        let line = ''
        let i = 0
        while(i < length) {
            line += `${chalk.red.bold('*')}`
            i += 1
        }
        line += '\n\n\n'
        console.log(line)
    }
    static statementLine(maxLength, padding, statement) {
        let line = ''
        let i = 0
        while(i < maxLength) {
            if(i === 0 || i === maxLength-1) {
                line += `${chalk.red.bold('*')}`
            } else if(i < padding || i >= (padding + statement.text.length)) {
                line += `${chalk.red.bold(' ')}`
            } else if(i === padding) {
                line += `${statement.formattedText}`
            }
            i += 1
        }
        console.log(line)
    }
}

module.exports = MessageFormatter
