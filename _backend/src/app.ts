// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
// import { addData, updateData, deleteData, syncData } from './controllers/sheetController';
import { syncData, getRaw, addData, } from './controllers/sheetController';
import './utils/cronSchedule';  // Importa a execução do cron job

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// Definição dos endpoints
app.get('/get-raw', getRaw);
app.post('/add', addData);
// app.put('/update', updateData);
// app.delete('/delete', deleteData);
app.post('/sync', syncData);  // Endpoint para sincronização manual

export default app;
