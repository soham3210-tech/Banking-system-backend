const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Banking System API",
      version: "1.0.0",
      description: "Backend API documentation for Banking System",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

  },

  apis: [
    `${__dirname}/../routes/*.js`,
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;