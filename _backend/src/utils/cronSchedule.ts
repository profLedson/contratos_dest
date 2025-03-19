// src/utils/cron.ts
import cron from 'node-cron';
import { syncDataWithDatabase } from '../services/syncDatabaseService';

// Agendar a sincronização para rodar todos os dias à meia-noite
cron.schedule('0 0 * * *', async () => {
  try {
    const auth = 'YOUR_GOOGLE_AUTH';  // Defina a autenticação do Google aqui
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    await syncDataWithDatabase();
  } catch (error) {
    console.error('Erro ao executar sincronização diária:', error);
  }
});
