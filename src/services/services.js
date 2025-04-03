import { carts, products, users, tickets } from "../dao/factory.js";

import CartService from "./cart.service.js";
import ProductService from "./product.service.js";
import UserService from "./user.service.js";
import TicketService from "./ticket.service.js";
import MockingService from "./mocking.service.js";

export const cartService = new CartService(carts);
export const productService = new ProductService(products);
export const userService = new UserService(users);
export const ticketService = new TicketService(tickets);
export const MockingService = new MockingService();