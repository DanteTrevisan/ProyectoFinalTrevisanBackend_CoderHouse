import ticketsModel from "./models/ticket.mongodb.model.js";

class TicketMongoDAO {
    constructor(){}

    async create(ticket){
        try {
            const dbTicket = (await ticketsModel.create(ticket)).toObject();
            return dbTicket
        } catch (error) {
            throw error;
        }
    }
}

export default TicketMongoDAO