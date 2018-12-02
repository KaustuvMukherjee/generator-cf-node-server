'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const skeleton = require('./src/skeleton')
const userInput = require('./src/userInput')
const update = require('./src/update')
const CURR_DIR = process.cwd()

function initialize () {
    global.continue = true
    global.appData = {}
    global.appData.userInputs = {}

    global.appData.nodeDependencies = []
    global.appData.nodeDevDependencies = []
    global.appData.nodeDependencies.push('body-parser')
    global.appData.nodeDependencies.push('express')
    global.appData.nodeDependencies.push('morgan')
    global.appData.nodeDevDependencies.push('directory-exists')
    global.appData.nodeDevDependencies.push('eslint')
    global.appData.nodeDevDependencies.push('file-exists')
    global.appData.nodeDevDependencies.push('husky')
    global.appData.nodeDevDependencies.push('jest')
    global.appData.nodeDevDependencies.push('lint-staged')
    global.appData.nodeDevDependencies.push('prettier')
    global.appData.nodeDevDependencies.push('supertest')
    global.appData.nodeDevDependencies.push('swagger-parser')
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
    async install() {
        if(global.continue === false) {
            return
        }
        var npmdDirectory = `${CURR_DIR}/${global.appData.userInputs.projectName.val}`
        process.chdir(npmdDirectory)
        if(global.appData.nodeDependencies.length > 0) {
            this.npmInstall(global.appData.nodeDependencies, {'save': true})
        }
        if(global.appData.nodeDevDependencies.length > 0) {
            this.npmInstall(global.appData.nodeDevDependencies, {'save-dev': true})
        }
    }
}
