/*
    Generic health response.
 */

const instanceIndex = process.env.CF_INSTANCE_INDEX

class HealthService {
    static up() {
        return {
            "status": "UP",
            "cfInstanceIndex": instanceIndex ? instanceIndex : 0,
            "lastUpdatedAt":(new Date()).toLocaleString()
        }
    }

    static down() {
        return {
            "status": "DOWN"
        }
    }
}

module.exports = HealthService
