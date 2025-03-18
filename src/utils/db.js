import mongoose from "mongoose";
import "dotenv/config.js"

const dbUserName = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME;

const dbURL = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.lu0r8.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`

export default async function connectDB() {
    try {
        await mongoose.connect(dbURL);
        console.log(`Conecion con la base de datos ${dbName} de MongoDB Atlas exitosa`);
    } catch (error) {
        console.error(`Error al intentar conectar con la base de datos ${dbName}`, error);
        process.exit()
    }
}