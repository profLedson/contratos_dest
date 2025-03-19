import express from 'express'

import { google} from 'googleapis'

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT
const app = express();

// Conexão Google Auth
async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const spreadsheetId = '10Ssf-1EKjhdo0XwQjsiaTPXxo03GOyhkYeObVV4av2I' 
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version: 'v4',
        auth: client
    })
    
    return { auth, client, googleSheets, spreadsheetId}
}

app.get('/metadata', async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    const metadata = await googleSheets.spreadsheets.get( {
        auth, 
        spreadsheetId
    } )

    res.send(metadata)
})

app.get('/get-rows', async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth, 
        spreadsheetId,
        range: "Página1!A1:D",
        valueRenderOption: "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING"
      });
      

    res.send(getRows.data)
});



app.listen(PORT, () => {
    console.log(`Running http://localhost.com:${PORT}`)
})
