/*
 * Class - Skeleton
 */
'use strict'
const winston = require('./winston')
const fs = require('fs')
const CURR_DIR = process.cwd()

class Skeleton {
    static generate() {
        // Check if the project alreday exists, if yes don't proceed
        if(fs.existsSync(`${CURR_DIR}/${global.appData.userInputs.projectName.val}`)) {
            winston.info(`Project '${global.appData.userInputs.projectName.val}' already exists. Cannot proceed!!`)
            global.continue = false
            return
        }
        // Create root directory
        fs.mkdirSync(`${CURR_DIR}/${global.appData.userInputs.projectName.val}`)
        // Figure out the correct template to load
        const templatePath = `${__dirname.replace('/src', '')}/templates/${global.appData.userInputs.projectType.val}`
        // Copy template content to destination project
        Skeleton.createDirectoryContents(templatePath, global.appData.userInputs.projectName.val)
    }

    static createDirectoryContents(templatePath, projectPath) {
        const filesToCreate = fs.readdirSync(templatePath)
        //
        filesToCreate.forEach(file => {
            const origFilePath = `${templatePath}/${file}`
            //
            const stats = fs.statSync(origFilePath)
            //
            if (stats.isFile()) {
                if(file !== '.DS_Store') {
                    const contents = fs.readFileSync(origFilePath, 'utf8')
                    const writePath = `${CURR_DIR}/${projectPath}/${file}`
                    fs.writeFileSync(writePath, contents, 'utf8')
                } else {
                    winston.info(`Ignoring '${file}' from project.`)
                }
            } else if (stats.isDirectory()) {
                fs.mkdirSync(`${CURR_DIR}/${projectPath}/${file}`)
                Skeleton.createDirectoryContents(`${templatePath}/${file}`, `${projectPath}/${file}`)
            }
        })
    }
}

module.exports = Skeleton
