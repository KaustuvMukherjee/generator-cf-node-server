'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const skeleton = require('./src/skeleton')
const userInput = require('./src/userInput')
const update = require('./src/update')

function initialize () {
    global.continue = true
    global.appData = {}
    global.appData.userInputs = {}

    global.appData.nodeDependencies = []
    global.appData.nodeDependencies.push('body-parser')
    global.appData.nodeDependencies.push('express')
    global.appData.nodeDependencies.push('morgan')
    global.appData.nodeDependencies.push('husky')
    global.appData.nodeDependencies.push('lint-staged')
}

module.exports = class extends Generator {

    async prompting() {
        initialize()
        global.appData.generator = this
        return await userInput.handleUserInputs()
    }
    writing() {
        if(global.continue === false) {
            return
        }
        if(global.appData.userInputs.projectType.val) {
            if(global.appData.userInputs.projectName.val) {
                skeleton.generate()
                update.packageJSON()
                update.manifestYAML()
            }
        }
    }
    install() {
        if(global.continue === false) {
            return
        }
        process.chdir(global.appData.userInputs.projectName.val)
        this.npmInstall(global.appData.nodeDependencies, {'save': true})
    }
}
