import cors from 'cors'
import express from 'express'
import dbConnect from '../db-config.mjs'

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

dbConnect();

app.listen(PORT, ()=>{
    console.log('Servidor lanzado exitosamentre! :) '.concat(PORT));
    
});