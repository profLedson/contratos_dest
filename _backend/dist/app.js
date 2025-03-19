"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { addData, updateData, deleteData, syncData } from './controllers/sheetController';
const sheetController_1 = require("./controllers/sheetController");
require("./utils/cronSchedule"); // Importa a execução do cron job
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
// Definição dos endpoints
app.get('/get-raw', sheetController_1.getRaw);
app.post('/add', sheetController_1.addData);
// app.put('/update', updateData);
// app.delete('/delete', deleteData);
app.post('/sync', sheetController_1.syncData); // Endpoint para sincronização manual
exports.default = app;
