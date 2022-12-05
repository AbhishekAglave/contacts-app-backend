

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Issue Management System",
      version: "2.0.0"
    },
    servers: [{ url: process.env.HOST_FOR_SWAGGER }]
  },
  apis: ["./src/swaggerDocs.yaml"]
};

const swaggerSpecs = swaggerJsDoc(options);
const swaggerServe = swaggerUI.serve;
const uiSetup = swaggerUI.setup(swaggerSpecs);

module.exports = {
  swaggerServe: swaggerServe,
  uiSetup: uiSetup
};