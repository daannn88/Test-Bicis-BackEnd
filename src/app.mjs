import cors from 'cors'
import express from 'express'
import dbConnect from '../db-config.mjs'

import station from './routes/station.route.mjs'
import bikes from './routes/bike.route.mjs'
import rents from './routes/rent.route.mjs'

const app = express();
const PORT = process.env.PORT ?? 3003;

app.use(cors());
app.use(express.json());

app.use(station)
app.use(bikes)
app.use(rents)


dbConnect();

app.listen(PORT, ()=>{
    console.log('Servidor lanzado exitosamentre! :) '.concat(PORT));
    
});