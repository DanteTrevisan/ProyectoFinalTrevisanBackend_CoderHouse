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
const httpServer = app.listen(PORT, () => {
    console.log(`Server de Express.js en puerto: ${PORT}`)
})

const io = new Server(httpServer)

app.use(express.urlencoded({ extended: true}))
app.use(express.static(`${rootPath}`))
app.use(express.json())
app.set("views", rootPath + "src\\views")
app.engine("handlebars", handlebars.engine());
app.set("views engine", "handlebars")

app.use(apiRoute + productsRoute, productsRouter)
app.use(apiRoute + cartsRoute, cartsRouter)
/*app.use(viewsRouter)*/




