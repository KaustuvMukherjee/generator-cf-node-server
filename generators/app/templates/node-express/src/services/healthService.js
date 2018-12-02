/*
 * Generic health response in Cloud Foundry.
 */

const instanceIndex = process.env.CF_INSTANCE_INDEX

class HealthService {
    static up() {
        return {
            'status': 'UP'
        }
    }

    static down() {
        return {
            'status': 'DOWN'
        }
    }
}

module.exports = HealthService
