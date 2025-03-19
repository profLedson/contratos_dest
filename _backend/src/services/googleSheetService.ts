// src/services/googleSheetsService.ts
import { google } from 'googleapis';


/**
 * Tipo para dados da planilha.
 */
type RowData = string[];

// Conexão Google Auth
async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    // const spreadsheetId = '10Ssf-1EKjhdo0XwQjsiaTPXxo03GOyhkYeObVV4av2I' 
    const spreadsheetId = '10Ssf-1EKjhdo0XwQjsiaTPXxo03GOyhkYeObVV4av2I' 
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version: 'v4',
        auth
    })
        
    return { auth, client, googleSheets, spreadsheetId}
}

async function addDataToSheet( data: RowData) {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const resource = {
    values: data,
  };

  try {
   
    const response = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Página1!B2:H',
      valueInputOption: "USER_ENTERED",
      ...resource
    });
    return response.data;
    
  } catch (error) {
    throw new Error('Erro ao adicionar dados à planilha: ' + error);
  }
}


// async function updateDataInSheet(auth: any, spreadsheetId: string, range: string, newData: RowData) {
//   const sheets = google.sheets({ version: 'v4', auth });
//   const resource = {
//     values: [newData],
//   };

//   try {
//     const response = await sheets.spreadsheets.values.update({
//       spreadsheetId,
//       range,
//       valueInputOption: 'RAW',
//       ...resource,
//     });
//     return response;
//   } catch (error) {
//     throw new Error('Erro ao atualizar dados na planilha: ' + error);
//   }
// }


// async function deleteRowInSheet(auth: any, spreadsheetId: string, rowIndex: number) {
//   const sheets = google.sheets({ version: 'v4', auth });
//   const requests = [{
//     deleteDimension: {
//       range: {
//         sheetId: 0,  // ID da planilha, pode ser ajustado conforme necessário
//         dimension: 'ROWS',
//         startIndex: rowIndex,
//         endIndex: rowIndex + 1,
//       },
//     },
//   }];
//   const batchUpdateRequest = { requests };

//   try {
//     const response = await sheets.spreadsheets.batchUpdate({
//       spreadsheetId,
//       ...batchUpdateRequest,
//     });
//     return response;
//   } catch (error) {
//     throw new Error('Erro ao deletar linha da planilha: ' + error);
//   }
// }

// export { addDataToSheet, updateDataInSheet, deleteRowInSheet, RowData };
export {  addDataToSheet, getAuthSheets};
