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
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncData = syncData;
exports.addData = addData;
exports.getRaw = getRaw;
// import { addDataToSheet, updateDataInSheet, deleteRowInSheet } from '../services/googleSheetService';
const googleSheetService_1 = require("../services/googleSheetService");
const syncDatabaseService_1 = require("../services/syncDatabaseService");
/**
 * Controlador para adicionar dados à planilha
 */
function addData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rowData } = req.body;
            yield (0, googleSheetService_1.addDataToSheet)(rowData);
            res.status(200).send(rowData);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
/**
 * Controlador para atualizar dados na planilha
 */
function getRaw(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { googleSheets, auth, spreadsheetId } = yield (0, googleSheetService_1.getAuthSheets)();
        const getRows = yield googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Página1!A1:H",
            valueRenderOption: "UNFORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING"
        });
        res.send(getRows.data);
    });
}
;
// async function updateData(req: Request, res: Response) {
//   try {
//     const { auth, spreadsheetId, range, newData } = req.body;
//     await updateDataInSheet(auth, spreadsheetId, range, newData);
//     res.status(200).send('Dados atualizados na planilha com sucesso');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }
/**
 * Controlador para deletar dados da planilha
 */
// async function deleteData(req: Request, res: Response) {
//   try {
//     const { auth, spreadsheetId, rowIndex } = req.body;
//     await deleteRowInSheet(auth, spreadsheetId, rowIndex);
//     res.status(200).send('Dados deletados da planilha com sucesso');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }
/**
 * Controlador para sincronizar dados com o banco de dados
 */
function syncData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { googleSheets, auth, spreadsheetId } = yield (0, googleSheetService_1.getAuthSheets)();
            yield (0, syncDatabaseService_1.syncDataWithDatabase)();
            console.log('Banco de dados sincronizado com sucesso');
            res.status(200).send('Banco de dados sincronizado com sucesso');
        }
        catch (error) {
            res.status(500).send(error);
            console.log('Erro ao sincroinar ' + error);
        }
    });
}
