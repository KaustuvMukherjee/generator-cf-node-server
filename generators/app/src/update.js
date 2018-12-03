'use strict'
const fs = require('fs')
const handleBars = require('handlebars')
const CURR_DIR = process.cwd()

class Update {
    static packageJSON () {
        let packageJSONPath = `${CURR_DIR}/${global.appData.userInputs.projectName.val}/package.json`
        const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'))
        packageJSON.name = `${global.appData.userInputs.projectName.val}-${global.appData.userInputs.version.val}`
        packageJSON.version = `${global.appData.userInputs.version.val}`
        packageJSON.description = `${global.appData.userInputs.description.val}`
        packageJSON.author = `${global.appData.userInputs.author.val} <${global.appData.userInputs.email.val}>`
        packageJSON.engines.node = `${global.appData.userInputs.node.val}`
        packageJSON.engines.npm = `${global.appData.userInputs.npm.val}`
        fs.unlinkSync(packageJSONPath)
        fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON))
    }
    static manifestYAML () {
        let name = `${global.appData.userInputs.projectName.val}-${global.appData.userInputs.version.val}`
        let host = `${global.appData.userInputs.projectName.val}`
        let services = '  - redis_clncnct_provider_service\r\n  - redis_clncnct_provider_service'

        let manifestYMLPath = `${CURR_DIR}/${global.appData.userInputs.projectName.val}/manifest.yml`
        const sourceManifest = fs.readFileSync(manifestYMLPath).toString()
        const template = handleBars.compile(sourceManifest)
        const manifestYML = template({PROJECT_NAME: name, HOST: host})

        fs.unlinkSync(manifestYMLPath)
        fs.writeFileSync(manifestYMLPath, manifestYML)
    }
}

module.exports = Update
