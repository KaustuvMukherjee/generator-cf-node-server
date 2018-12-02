const SwaggerParser = require('swagger-parser')
const fs = require('fs')
const apiDefinitionPath = fs.realpathSync('apiDefinition')
const openAPIPath = `${apiDefinitionPath}/openapi.json`

class OpenAPIParser {

    static async validate() {
        try {
            return await SwaggerParser.validate(openAPIPath)
        } catch (e) {
            console.error('Onoes! The API is invalid. ' + e.message)
            throw (e)
        }
    }

    static async parseAPISpec() {
        try {
            return await SwaggerParser.parse(openAPIPath)
        } catch (e) {
            console.error('Onoes! The API is invalid. ' + e.message)
            throw (e)
        }
    }
}

module.exports = OpenAPIParser
