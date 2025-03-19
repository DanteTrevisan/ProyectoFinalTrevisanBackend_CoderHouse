import express from 'express';
import  productsRouter  from './routes/products.route.js';
import  cartsRouter from './routes/carts.route.js';
import { PORT } from './utils/ports.js';
import { rootPath } from './utils/paths.js';
import { apiRoute, productsRoute, cartsRoute } from './utils/routes.js';
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.route.js";
import { Server } from "socket.io";
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
app.use(express.static(`${rootPath}`))
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

console.log("hola")




