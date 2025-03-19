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
exports.addDataToSheet = addDataToSheet;
exports.getAuthSheets = getAuthSheets;
// src/services/googleSheetsService.ts
const googleapis_1 = require("googleapis");
// Conexão Google Auth
function getAuthSheets() {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });
        // const spreadsheetId = '10Ssf-1EKjhdo0XwQjsiaTPXxo03GOyhkYeObVV4av2I' 
        const spreadsheetId = '10Ssf-1EKjhdo0XwQjsiaTPXxo03GOyhkYeObVV4av2I';
        const client = yield auth.getClient();
        const googleSheets = googleapis_1.google.sheets({
            version: 'v4',
            auth
        });
        return { auth, client, googleSheets, spreadsheetId };
    });
}
function addDataToSheet(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { googleSheets, auth, spreadsheetId } = yield getAuthSheets();
        const resource = {
            values: data,
        };
        try {
            const response = yield googleSheets.spreadsheets.values.append(Object.assign({ auth,
                spreadsheetId, range: 'Página1!B2:H', valueInputOption: "USER_ENTERED" }, resource));
            return response.data;
        }
        catch (error) {
            throw new Error('Erro ao adicionar dados à planilha: ' + error);
        }
    });
}
