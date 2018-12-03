'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const rimraf = require('rimraf')
const CURR_DIR = process.cwd()

const testDir = "test"
const TIMEOUT = 300000

describe('generator-cf-node-server:app', () => {
    beforeAll(() => {
        return helpers
            .run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, './tmp'))
            .withOptions({'skip-install': true})
    }, TIMEOUT)

    it('Verifying files at /', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}`
        assert.file([`${targetDirectory}/app.js`,
            `${targetDirectory}/index1.js`,
            `${targetDirectory}/manifest.yml`,
            `${targetDirectory}/package.json`])
    })

    it('Verifying files at /src/controllers', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}/src/controllers`
        assert.file([`${targetDirectory}/healthController.js`])
    })

    it('Verifying files at /src/listeners', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}/src/listeners`
        assert.file([`${targetDirectory}/processListener.js`])
    })

    it('Verifying files at /src/middlewares', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}/src/middlewares`
        assert.file([`${targetDirectory}/middleware.js`])
    })

    it('Verifying files at /src/openAPI', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}/src/openAPI`
        assert.file([`${targetDirectory}/generateStub.js`])
        assert.file([`${targetDirectory}/openAPIParser.js`])
    })

    it('Verifying files at /src/routers', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}/src/routers`
        assert.file([`${targetDirectory}/router.js`])
    })

    it('Verifying files at /src/services', () => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp/${global.appData.userInputs.projectName.val}/src/services`
        assert.file([`${targetDirectory}/healthService.js`])
    })

    afterAll(() => {
        let targetDirectory = `${CURR_DIR}/${testDir}/tmp`
        rimraf(targetDirectory, () => {
        })
    }, TIMEOUT)

})
