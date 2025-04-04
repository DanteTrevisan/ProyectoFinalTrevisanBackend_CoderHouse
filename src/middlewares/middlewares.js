import express, { Router } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express";

import { dbURL } from "../config/mongoDb.config.js";
import config from "../config/env.config.js";

import errorHandler from "./errorHandler.js";
import addLogger from "./logger.js";

import { rootPath } from "../utils/paths.js";
import swaggerOptions from "../utils/docs.js";
import swaggerJSDoc from "swagger-jsdoc";

const middlewares = Router();

middlewares.use(express.urlencoded({extended: true}));
middlewares.use(express.static(`${rootPath}public`));
middlewares.use(express.json());

middlewares.use(cookieParser(config.cookiesSecret))

middlewares.use(
    session({
        store: MongoStore.create({
            mongoUrl: dbURL,
            ttl:3600,
        }),
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
    })
);


middlewares.use(passport.initialize());
middlewares.use(passport.session());

middlewares.use(cors());

middlewares.use(addLogger);

middlewares.use(errorHandler);


export default middlewares