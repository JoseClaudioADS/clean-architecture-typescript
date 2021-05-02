module.exports = {
    "name": "default",
    "type": "sqlite",
    "database": "example.sql",
    "entities": [process.env.npm_lifecycle_event === 'start:prod' ? "dist/infra/database/entity/*.js" : 'src/infra/database/entity/*.ts'], //map dist *.js too
    "synchronize": true //only for development
 }