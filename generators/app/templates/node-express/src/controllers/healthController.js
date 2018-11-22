const HealthService = require('../services/healthService')

class HealthController {
    static validateReq(req, res, next) {
        console.log("HealthController.validateReq called...");
        next('route');
    }
    static processRequest(req, res, next) {
        console.log("HealthController.processRequest called...");
        res.status(200).send(HealthService.up());
    }
};

module.exports = HealthController
