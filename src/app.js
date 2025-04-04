import express from 'express';
import handlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from "handlebars";
import { Server } from "socket.io";
import socketMessages from "./websockets/socketMessages.js"

import { rootPath } from './utils/paths.js';

import middlewares from './middlewares/middlewares.js';
import routes from './routes/routes.js';
import  config  from "./config/env.config.js";

const PORT = config.port;

const app = express();

// Express.js server start
const httpServer = app.listen(PORT, () => {
    console.log(`Server de Express.js en puerto: ${PORT}`)
})

const io = new Server(httpServer)

app.set("views", rootPath + "src\\views")
app.engine(
    "handlebars",
    handlebars.engine({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
);

app.set("view engine", "handlebars")

app.use(middlewares) /** MIDDLEWARES */
app.use(routes) /** ROUTER */


//WEBSOCKETS
socketMessages(io)

// MONGODB
//connectDB();