"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const app_1 = __importDefault(require("./app"));
/** Custom imports */
const requestInterceptor_1 = require("./utils/requestInterceptor");
app_1.default.use((0, cors_1.default)());
app_1.default.use(express_1.default.json());
app_1.default.use(express_1.default.urlencoded({ extended: true }));
app_1.default.all('*', requestInterceptor_1.requestInterceptor);
/** Custom Hooks | Middlewares */
// app.use('/', siteRoutes);
// app.use('/admin', adminRoutes);
// const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9001;
// const regularServer = http.createServer(app);
// Permitir frontend acessar a API
app_1.default.use((0, cors_1.default)({
    origin: "https://localhost:3000", // Permite apenas o frontend local
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
    credentials: false // Permite cookies e headers de autenticação
}));
const allowedOrigins = "*";
app_1.default.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Não permitido por CORS"));
        }
    },
    credentials: false
}));
// ===== SSL ====
const serverPort = process.env.PORT ? parseInt(process.env.PORT) : 9001;
const httpsPort = 443; // Porta HTTPS padrão
// Criando servidor HTTP
const httpServer = http_1.default.createServer(app_1.default);
// Criando servidor HTTPS (somente em produção)
let httpsServer = null;
if (process.env.NODE_ENV === 'production') {
    try {
        const sslOptions = {
            key: fs_1.default.readFileSync('/workspaces/contratos_dest/_backend/key.pem'), // Caminho para chave privada
            cert: fs_1.default.readFileSync('/workspaces/contratos_dest/_backend/cert.pem') // Caminho para certificado
        };
        httpsServer = https_1.default.createServer(sslOptions, app_1.default);
    }
    catch (error) {
        console.error("Erro ao carregar certificados SSL:", error);
        process.exit(1);
    }
}
// Função para rodar servidores
const runServer = (port, server) => {
    server.listen(port, () => {
        console.log(`🚀 Server running at ${port} (${server instanceof https_1.default.Server ? 'HTTPS' : 'HTTP'})`);
    });
};
if (process.env.NODE_ENV === 'production') {
    if (httpsServer) {
        runServer(httpsPort, httpsServer); // Servidor HTTPS na porta 443
    }
}
else {
    runServer(80, httpServer); // Servidor HTTP na porta 80
    // runServer(serverPort, httpServer);
}
