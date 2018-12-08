# Micro-service framework in NodeJS

## Supports OpenAPI Specification V3
- Define your API:
```bash
/apiDefinition/openapi.json
```
- Run the following to create relevant controller and service classes:
```bash
npm run stub
```

## Provides out-of-the box health endpoint
- Run the server locally:
```bash
npm run start
```
- Test '/health' endpoint:
```bash
http://localhost:3000/health
```

## Ready to deploy to Cloud Foundry
- To deploy the app to Cloud Foundry:
```bash
cf push -f manifest.yml
```
