/*
 * Class - ProcessListener
 */
'use strict'
const winston = require('./winston')
const formatter = require('./messageFormatter')

class ProcessListener {
    static listen() {
        process.on('exit', (code) => {
            if(global.continue === true) {
                formatter.noteToUser()
            } else {
                winston.info(`EXIT CODE: ${code}`)
            }
        })
        //
        process.on('message', (msg) => {
            winston.info(`MESSAGE: ${msg}`)
        })
        //
        process.on('rejectionHandled', (reason, promise) => {
            winston.info(`REJECTION HANDLED at: ${promise} reason: ${reason}`)
        })
        //
        process.on('uncaughtException', (err) => {
            winston.info(`UNCAUGHT EXCEPTION: ${err}`)
        })
        //
        process.on('unhandledRejection', (reason, promise) => {
            winston.info(`UNHANDLED REJECTION at: ${promise} reason: ${reason}`)
        })
        //
        process.on('warning', (warning) => {
            winston.info(`WARNING: ${warning}`)
        })
    }
}

module.exports = ProcessListener
