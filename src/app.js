import express from 'express';
import handlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from "handlebars";
import { Server } from "socket.io";
import socketMessages from "./websockets/socketMessages.js"

import { rootPath } from './utils/paths.js';

import middlewares from './middlewares/middlewares.js';




import { apiRoute, productsRoute, cartsRoute } from './utils/routes.js';
import viewsRouter from "./routes/views.route.js";
import connectDB from "./utils/db.js";
import ProductManagerDB from "./dao/services/ProductManagerDB.js";
import messagesModel from "./dao/models/messages.model.js";

const app = express();

// Express.js server start
const httpServer = app.listen(PORT, () => {
    console.log(`Server de Express.js en puerto: ${PORT}`)
})

const io = new Server(httpServer)

/** MIDDLEWARES */
app.use(express.urlencoded({ extended: true}))
app.use(express.static(`${rootPath}public`))
app.use(express.json())
app.set("views", rootPath + "src\\views")
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars")

/** ROUTES */
app.use(apiRoute + productsRoute, productsRouter)
app.use(apiRoute + cartsRoute, cartsRouter)
app.use(viewsRouter)

//WEBSOCKETS
const messages = [];

io.on("connection", async(socket) => {
    console.log("Cliente conectado");
    const limit = 1000;
    const page = 1;
    const productManagerDB = new ProductManagerDB();
    let products = await productManagerDB.getProducts(limit, page, null, null);

    socket.emit("products", products.payload);

    socket.on("newProduct", async (newProduct) => {
        console.log("Nuevo Producto");
        console.log(newProduct);
        await productManagerDB.addProduct(newProduct);
        products = await productManagerDB.getProducts(limit, page, null, null);
        socket.emit("products", products.payload)
    });

    socket.on("message", async(data) => {
        console.log(data);
        messages.push(data);
        await messagesModel.create(data);
        io.emit("messagesLogs", messages)
    });
});

// MONGODB
connectDB();