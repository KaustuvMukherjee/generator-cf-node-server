'use strict'
const fs = require('fs')
const chalk = require('chalk')
const yosay = require('yosay')
var PROJECT_TYPES = fs.readdirSync(`${__dirname.replace('/src', '')}/templates`)

class UserInput {
    static refineProjectTypes() {
        PROJECT_TYPES = PROJECT_TYPES.filter(function(value, index, arr){
            if(value === '.DS_Store') {
                return false
            }
            return true
        })
    }
    static greetUser () {
        console.log(
            yosay(`Welcome to ${chalk.red.bold('cf-node-server')} generator! by: ${chalk.yellow.bold('Kaustuv Mukherjee')}`, {maxLength: 36})
        )
    }
    static async getProjectType() {
        UserInput.refineProjectTypes()
        const prompts = [
            {
                type: 'list',
                name: 'val',
                message: 'Enter project type: ',
                choices: PROJECT_TYPES,
                default: 'node-express'
            }
        ]
        global.appData.userInputs.projectType = await UserInput.getFromUser(prompts)
    }
    static async getProjectName() {
        const prompts = [
            {
                type: 'input',
                name: 'val',
                message: 'Enter project name: ',
                default: 'node-express-server'
            }
        ]
        global.appData.userInputs.projectName = await UserInput.getFromUser(prompts)
    }
    static async getVersion() {
        const prompts = [
            {
                type: 'input',
                name: 'val',
                message: 'Enter version: ',
                default: '1.0.0'
            }
        ]
        global.appData.userInputs.version = await UserInput.getFromUser(prompts)
    }
    static async getDescription() {
        const prompts = [
            {
                type: 'input',
                name: 'val',
                message: 'Enter description: ',
                default: 'Basic node-express server.'
            }
        ]
        global.appData.userInputs.description = await UserInput.getFromUser(prompts)
    }
    static async getAuthor() {
        const prompts = [
            {
                type: 'input',
                name: 'val',
                message: 'Enter author: ',
                default: 'Your name'
            }
        ]
        global.appData.userInputs.author = await UserInput.getFromUser(prompts)
    }
    static async getEmail() {
        const prompts = [
            {
                type: 'input',
                name: 'val',
                message: 'Enter email: ',
                default: 'abc@xyz.com'
            }
        ]
        global.appData.userInputs.email = await UserInput.getFromUser(prompts)
    }
    static async getBuildpack() {
        const prompts = [
            {
                type: 'input',
                name: 'val',
                message: 'Enter buildpack: ',
                default: ''
            }
        ]
        global.appData.userInputs.buildpack = await UserInput.getFromUser(prompts)
    }
    static async getFromUser(prompts) {
        return await global.appData.generator.prompt(prompts)
    }
    static async handleUserInputs() {
        try {
            UserInput.greetUser()
            await UserInput.getProjectType()
            await UserInput.getProjectName()
            await UserInput.getVersion()
            await UserInput.getDescription()
            await UserInput.getAuthor()
            await UserInput.getEmail()
        } catch(ex) {
            console.log(ex)
        }
    }
}

module.exports = UserInput
