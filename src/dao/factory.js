import config from "../config/env.config.js";
import MongoDB from "../config/mongoDb.config.js";

import CartMondodbDAO from "./mongodb/cart.mongodb.dao.js";
import ProductMongodbDAO from "./mongodb/product.mongodb.dao.js";
import TicketMongoDAO from "./mongodb/ticket.mongodb.dao.js";
import UserMongodbDAO from "./mongodb/user.mongodb.dao.js";

export let carts;
export let products;
export let users;
export let tickets;

switch (config.dao) {
    case "mongodb":
        MongoDB.getInstance();
        const { default: cartsMongodb } = await import(
            "./mongodb/cart.mongodb.dao.js"
        );
        const { default: productsMongodb } = await import(
            "./mongodb/product.mongodb.dao.js"
        );
        const { default: usersMongodb } = await import(
            "./mongodb/user.mongodb.dao.js"
        );
        const { default: ticketsMongodb } = await import(
            "./mongodb/ticket.mongodb.dao.js"
        );
        carts = new cartsMongodb();
        products = new productsMongodb();
        users = new usersMongodb();
        tickets = new ticketsMongodb();
        break;
    case "files":
        // no implementation
        break;
    default:
        break;
}

