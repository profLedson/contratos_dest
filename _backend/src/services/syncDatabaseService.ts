// src/services/syncService.ts
import { google } from 'googleapis';
import prisma from '../models/prismaClient';
import { getAuthSheets } from './googleSheetService';


async function syncDataWithDatabase() {
  const { auth, spreadsheetId } = await getAuthSheets();
  const rows = await getGoogleSheetsData(
    auth,
    spreadsheetId,
    'Página1!A1:H'
  );

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
    await prisma.contrato.deleteMany();  // Limpa dados existentes

    for (const row of rows) {
      
        await prisma.contrato.create({
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
  } catch (error) {
    throw new Error('Erro ao sincronizar dados com o banco de dados: ' + error);
  }
}

async function getGoogleSheetsData(auth: any, spreadsheetId: string, range: string): Promise<any> {
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values || [];
}

export { syncDataWithDatabase };
