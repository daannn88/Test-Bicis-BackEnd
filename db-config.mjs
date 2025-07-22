import mongoose from "mongoose";

const DB_URI = process.env.DB_URI ?? 'mongodb://localhost:27017/db-Test-Bicis'

async function dbConnect() {
    try{
        mongoose.connect(DB_URI, {})

        console.log('Connected! :)');
        
    }catch(error){
        console.error(error);

        console.log('Error al conectarse a la base de datos');
        
        
    }
}

export default dbConnect;