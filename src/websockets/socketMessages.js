import { Server } from "socket.io";

import { productService } from "../services/services.js"; 
import messagesModel from "../dao/mongodb/models/message.mongodb.model.js";

function socketMessages(socketServer){
    const messages = [];

    socketServer.on("connection", async (socket) => {
        console.log("Cliente Conectado");
        const limit = 1000;
        const page = 1;
        let products = await productService.getAllProducts(limit, page, null, null);

        socket.emit("products", products.payload);

        socket.on("newProduct", async (newProduct) => {
            console.log("Nuevo Producto");
            await productService.createProduct(newProduct);
            products = await productService.getAllProducts(limit, page, null, null);
            socket.emit("products", products.payload)
        });

        socket.on("message", async (data) => {
            messages.push(data);
            await messagesModel.create(data);
            socketServer.emit("messageLogs", messages);
        });
    });
}

export default socketMessages;