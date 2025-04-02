import mongoose from "mongoose";
import "dotenv/config"

const dbUsername = config.dbUsername;
const dbPassword = config.dbPassword;
const dbName = config.dbName;

export const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.lu0r8.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`

export default class MongoDB {
    constructor(){
        this.connectToDB();
    }

    async connectToDB(){
        try {
            await mongoose.connect(dbURL);
            console.log(`Conexion con la base de datos ${dbName} de MongoDB Atlas exitosa`);
        } catch (error) {
            console.error(`Error al intentar conectar con la base de datos ${dbName}`, error);
            process.exit()
    
        }
    }

    static #instance

    static getInstance() {
        if (this.#instance) {
            console.log("La conexion con la base de datos de MongoDB ya se encuentra establecida");
            return this.#instance
        }
        this.#instance = new MongoDB();
        return this.#instance
    }
}