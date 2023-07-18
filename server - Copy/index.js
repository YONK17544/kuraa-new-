import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/db.config.js';
import indexRouter from "./routes/indexRouter.js"
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

dbConnection();

app.get('/test',(req, res) =>{
    res.json('test ok')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);

const PORT = process.env.PORT || 8085;

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
})