const morgan = require('morgan')
const bodyParser = require('body-parser')

class Middleware {
    static initialize(app) {
        console.log('Initializing middlewares.....')
        app.use(morgan('tiny'))
        app.use(bodyParser.json())
        console.log('Middlewares initiaized.....')
    }
}

module.exports = Middleware
