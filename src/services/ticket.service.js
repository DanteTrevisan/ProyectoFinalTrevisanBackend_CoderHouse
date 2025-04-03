import TicketMongoDAO from "../dao/mongodb/ticket.mongodb.dao.js";

export default class TicketService{
    dao;

    constructor(dao){
        this.dao = dao;
    }

    async createTicket(ticket){
        return await this.dao.create(ticket);
    }
}