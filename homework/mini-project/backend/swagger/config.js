export const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini-project",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"],
};
