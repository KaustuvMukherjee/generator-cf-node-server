const path = require('path');
const fs = require('fs');
const controllerPath = path.join(__dirname, 'controllers').replace('/routers', '');
const routesJSON = require('./routes.json');
const HTTP_METHODS = ['get', 'post', 'put', 'delete'];

const loadRoutesConfig = () => {
    let arrConfig = [];
    for (const path in routesJSON.routes) {
        const route = routesJSON.routes[path];
        const methods = Object.keys(route).filter((key) => HTTP_METHODS.includes(key));
        methods.forEach((method) => {
            arrConfig.push({
                path: path,
                method: method,
                controller: route.controller,
                handlers: route[method]
            });
        });
    }
    return arrConfig;
};

const loadControllers = (app) => {
    app.controllers = {}
    console.log(controllerPath);
    fs.readdirSync(controllerPath).forEach((fileName) => {
        if(fileName.indexOf("Controller") > -1) {
            let controllerName = fileName.replace('.js', '');
            const Controller = require('../controllers/' + controllerName);
            app.controllers[controllerName] = Controller
        }
    })
};

const bindRouteToController = (controller, handler) => {
    return(async (req, res, next) => {
        await controller[handler](req, res, next);
    });
};

const bindRoutes = (app) => {
    loadControllers(app);
    loadRoutesConfig().forEach((route) => {
        route.handlers.forEach((handler) => {
            app[route.method](route.path, bindRouteToController(app.controllers[route.controller], handler));
        });
    })
};

class Router {
    static mountRoutes (app) {
        bindRoutes(app);
    }
};

module.exports = Router;


