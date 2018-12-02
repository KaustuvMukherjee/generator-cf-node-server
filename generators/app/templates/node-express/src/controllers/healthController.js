const HealthService = require('../services/healthService')

class HealthController {
    static validateHealthRequest(req, res, next) {
        console.log('HealthController.validateHealthRequest called...')
        next('route')
    }
    static getHealth(req, res, next) {
        console.log('HealthController.getHealth called...')
        res.status(200).send(HealthService.up())
    }
}

module.exports = HealthController
