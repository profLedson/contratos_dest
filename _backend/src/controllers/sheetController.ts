// src/controllers/sheetController.ts
import { Request, Response } from 'express';
// import { addDataToSheet, updateDataInSheet, deleteRowInSheet } from '../services/googleSheetService';
import {  addDataToSheet, getAuthSheets } from '../services/googleSheetService';
import { syncDataWithDatabase } from '../services/syncDatabaseService';

/**
 * Controlador para adicionar dados à planilha
 */
async function addData(req: Request, res: Response) {
  try {
    const {rowData} = req.body;
    await addDataToSheet(rowData);
    res.status(200).send(rowData);
  } catch (error) {
    res.status(500).send(error);
  }
}

/**
 * Controlador para atualizar dados na planilha
 */

async function getRaw(req: Request, res: Response) {  
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    const getRows = await googleSheets.spreadsheets.values.get({
        auth, 
        spreadsheetId,
        range: "Página1!A1:H",
        valueRenderOption: "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING"
      });      

    res.send(getRows.data)
};

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
async function syncData(req: Request, res: Response) {
  try {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    await syncDataWithDatabase();
    console.log('Banco de dados sincronizado com sucesso');
    res.status(200).send('Banco de dados sincronizado com sucesso');
  } catch (error) {
    res.status(500).send(error);
    console.log('Erro ao sincroinar ' + error);
  }
}

// export { addData, updateData, deleteData, syncData };
export { syncData, addData, getRaw };
