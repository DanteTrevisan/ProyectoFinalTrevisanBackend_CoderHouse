import { rootPath } from "./paths";

const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "E-commerce CoderHouse BackEnd",
            version: "1.0.0",
            description: "Documentacion API de proyecto e-commerce de programacion backend de coderhouse",
        },
        apis: [`${rootPath}src\\docs\\**\\*.yaml`],
    }
};

export default swaggerOptions;