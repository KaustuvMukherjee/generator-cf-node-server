/*
 *
 */
'use strict'
const winston = require('./src/winston')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const skeleton = require('./src/skeleton')
const userInput = require('./src/userInput')
const update = require('./src/update')
const processListener = require('./src/processListener')
const CURR_DIR = process.cwd()

function initialize () {
    processListener.listen()
    global.continue = true
    global.appData = {}
    global.appData.userInputs = {}

    global.appData.nodeDependencies = []
    global.appData.nodeDevDependencies = []
}

function determineDependencies() {
    global.appData.nodeDependencies.push('body-parser')
    if(global.appData.userInputs.projectType.val === 'node-express') {
        global.appData.nodeDependencies.push('express')
    } else {
        global.appData.nodeDependencies.push('koa')
        global.appData.nodeDependencies.push('koa-router')
    }
    global.appData.nodeDependencies.push('morgan')
    global.appData.nodeDependencies.push('winston')
    //
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
    install() {
        if(global.continue === false) {
            return
        }
        determineDependencies()
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
