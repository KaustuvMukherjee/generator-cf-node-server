# generator-cf-node-server
> Yeoman generator plugin for NodeJS micro-service scaffolding on Cloud Foundry.

#### Installation steps:

- Install [Yeoman](http://yeoman.io) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```
- Download or clone generator-cf-node-server and change directory to generator-cf-node-server. Run npm install.

```bash
cd generator-cf-node-server
npm i
```

- Use npm link to link the generator in the global node modules.

```bash
npm link
```

- Finally provide the necessary inputs to generate your NodeJS micro-service scaffolding.

```bash
yo cf-node-server
```

#### Highlights of the micro-service scaffolding project:
- Supports OpenAPI Specification V3.
- Provides out-of-the box '/health' API.
- Provides sample GET, PUT, POST request based on OpenAPI Specification V3.
- Auto generates stubs (controller & service classes) based on Open API Specification V3.
- Ready to deploy on Cloud Foundry.

#### Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).
 
# About the generated microservice scaffolding

## Supports OpenAPI Specification V3
#### Define your API:
```bash
/apiDefinition/openapi.json
```
#### Run the following to create relevant controller and service classes:
```bash
npm run stub
```
- As a ready example, try the /sample endpoint
```bash
npm run stub
npm run start
http://localhost:3000/sample
```

## Provides out-of-the box health endpoint
#### Run the server locally:
```bash
npm run start
```
- Test '/health' endpoint:
```bash
http://localhost:3000/health
```

## Ready to deploy to Cloud Foundry
#### To deploy the app to Cloud Foundry:
```bash
cf push -f manifest.yml
```

## License

MIT © [Kaustuv Mukherjee]()


[npm-image]: https://badge.fury.io/js/generator-cf-node-server.svg
[npm-url]: https://npmjs.org/package/generator-cf-node-server
[travis-image]: https://travis-ci.org/KaustuvMukherjee/generator-cf-node-server.svg?branch=master
[travis-url]: https://travis-ci.org/KaustuvMukherjee/generator-cf-node-server
[daviddm-image]: https://david-dm.org/KaustuvMukherjee/generator-cf-node-server.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/KaustuvMukherjee/generator-cf-node-server
