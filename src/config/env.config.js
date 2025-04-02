import dotenv from "dotenv";
import { Command } from "commander";
import Environment from "../types/environment.enum.js";

const program = new Command();
program.option("--dao <dao>", "Data Access Object Selector", "mongodb").parse();
const dao = program.opts().dao;

const ENVIRONMENT = Environment.development;

dotenv.config({
    path: ENVIRONMENT === Environment.production
    ? "./.env.production"
    : "./.env.development",
});

export default {
    dbUsername: process.env.MONGODB_USERNAME,
    dbPassword: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DBNAME,

    cookiesSecret: process.env.COOKIES_SECRET,

    sessionSecret: process.env.SESSION_SECRET,

    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,

    port: process.env.PORT,

    dao: dao,
    nodeEnv: process.env.NODE_ENV
};