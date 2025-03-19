"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDataWithDatabase = syncDataWithDatabase;
// src/services/syncService.ts
const googleapis_1 = require("googleapis");
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const googleSheetService_1 = require("./googleSheetService");
function syncDataWithDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const { auth, spreadsheetId } = yield (0, googleSheetService_1.getAuthSheets)();
        const rows = yield getGoogleSheetsData(auth, spreadsheetId, 'Página1!A1:H');
        // console.log("************** "+ typeof rows)
        // return
        // num_sesp       String   @unique
        // num_gms        String?  @unique
        // protocolo      String[]
        // num_licitacao  String   @unique
        // fsp            String?
        // unidade        String?
        // modalidade     String?
        // status    
        try {
            yield prismaClient_1.default.contrato.deleteMany(); // Limpa dados existentes
            for (const row of rows) {
                yield prismaClient_1.default.contrato.create({
                    data: {
                        num_sesp: row[1],
                        num_gms: row[2],
                        protocolo: row[3],
                        num_licitacao: row[4],
                        fsp: row[5],
                        unidade: row[6],
                        modalidade: row[7],
                        status: row[8],
                        internacional: row[9],
                        fonte_material: row[10],
                        responsavelId: row[11],
                    },
                });
            }
            //console.log('Dados sincronizados com sucesso no banco de dados!');
        }
        catch (error) {
            throw new Error('Erro ao sincronizar dados com o banco de dados: ' + error);
        }
    });
}
function getGoogleSheetsData(auth, spreadsheetId, range) {
    return __awaiter(this, void 0, void 0, function* () {
        const sheets = googleapis_1.google.sheets({ version: 'v4', auth });
        const response = yield sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        return response.data.values || [];
    });
}
