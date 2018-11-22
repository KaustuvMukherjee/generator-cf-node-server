
const http = require('http');
const Router = require('./src/routers/router.js');
const Middleware = require('./src/middlewares/middleware.js');

/*
    Class - Application
 */

const HTTP_PORT = 3000;

class Application {
    static run(app) {
        // Mount Middlewares
        Middleware.initialize(app);

        // Mount Routes
        Router.mountRoutes(app);

        // Create HTTP server
        http.createServer(app).listen(process.env.PORT || 3000, () => {
            console.log(`HTTPS server started at port ${process.env.PORT || 3000}`);
        });

    }
}

module.exports = Application;
