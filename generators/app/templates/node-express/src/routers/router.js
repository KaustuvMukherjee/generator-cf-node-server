/*
 * Class - Router
 */
'use strict'
const winston = require('../config/winston')
const path = require('path')
const fs = require('fs')
const controllerPath = path.join(__dirname, 'controllers').replace('/routers', '')
const apiDefinition = require('../../apiDefinition/openapi')
const HTTP_METHODS = ['get', 'post', 'put', 'delete']

const loadRoutesConfig = () => {
    let arrConfig = []
    for (const path in apiDefinition.paths) {
        const route = apiDefinition.paths[path]
        const methods = Object.keys(route).filter((key) => HTTP_METHODS.includes(key))
        methods.forEach((method) => {
            let handlers = []
            let methodImplInfo = route[method]
            if('x-validationOperationId' in methodImplInfo) {
                handlers.push(methodImplInfo['x-validationOperationId'])
            }
            handlers.push(methodImplInfo.operationId)
            arrConfig.push({
                path: path,
                method: method,
                controller: methodImplInfo['x-controller'],
                handlers: handlers
            })
        })
    }
    return arrConfig
}

const loadControllers = (app) => {
    app.controllers = {}
    fs.readdirSync(controllerPath).forEach((fileName) => {
        if(fileName.indexOf('.DS_Store') <= -1) {
            let controllerName = fileName.replace('.js', '')
            const Controller = require('../controllers/' + controllerName)
            app.controllers[controllerName] = Controller
        }
    })
}

const bindRouteToController = (controller, handler) => {
    return(async (req, res, next) => {
        await controller[handler](req, res, next)
    })
}

const bindRoutes = (app) => {
    loadControllers(app)
    loadRoutesConfig().forEach((route) => {
        route.handlers.forEach((handler) => {
            if(route.controller in app.controllers) {
                if(handler in app.controllers[route.controller]) {
                    app[route.method](route.path, bindRouteToController(app.controllers[route.controller], handler))
                    winston.info(`Route Map: PATH = ${route.path} | METHOD = ${route.method} | CONTROLLER = ${route.controller} | HANDLER = ${handler}`)
                } else {
                    winston.error(`Controller = ${route.controller} | Handler = ${handler} not found.`)
                }
            } else {
                winston.error(`Controller = ${route.controller} not found.}`)
            }
        })
    })
}

class Router {
    static mountRoutes (app) {
        bindRoutes(app)
    }
}

module.exports = Router


