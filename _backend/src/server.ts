import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import fs from 'fs';
import app from './app';

/** Custom imports */

import { requestInterceptor } from './utils/requestInterceptor';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.all('*', requestInterceptor);

/** Custom Hooks | Middlewares */
// app.use('/', siteRoutes);
// app.use('/admin', adminRoutes);
// const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9001;
// const regularServer = http.createServer(app);

// Permitir frontend acessar a API
app.use(cors({
    origin: "https://localhost:3000", // Permite apenas o frontend local
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
    credentials: false // Permite cookies e headers de autenticação
}));

const allowedOrigins = "*";

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Não permitido por CORS"));
        }
    },
    credentials: false
}));

// ===== SSL ====

const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9001;
const httpsPort: number = 443; // Porta HTTPS padrão

// Criando servidor HTTP
const httpServer = http.createServer(app);

// Criando servidor HTTPS (somente em produção)
let httpsServer: https.Server | null = null;
if (process.env.NODE_ENV === 'production') {
    try {
        const sslOptions = {
            key: fs.readFileSync('/workspaces/contratos_dest/_backend/key.pem'), // Caminho para chave privada
            cert: fs.readFileSync('/workspaces/contratos_dest/_backend/cert.pem') // Caminho para certificado
        };
        httpsServer = https.createServer(sslOptions, app);
    } catch (error) {
        console.error("Erro ao carregar certificados SSL:", error);
        process.exit(1);
    }
}

// Função para rodar servidores
const runServer = (port: number, server: http.Server | https.Server) => {
    server.listen(port, () => {
        console.log(`🚀 Server running at ${port} (${server instanceof https.Server ? 'HTTPS' : 'HTTP'})`);
    });
};

if (process.env.NODE_ENV === 'production') {
    if (httpsServer) {
        runServer(httpsPort, httpsServer); // Servidor HTTPS na porta 443
    }
} else {
    runServer(80, httpServer); // Servidor HTTP na porta 80
    // runServer(serverPort, httpServer);
}