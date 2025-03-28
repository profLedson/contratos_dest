import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';

/** Custom imports */
import siteRoutes from './routes/site'
import adminRoutes from './routes/admin'
import { requestInterceptor } from './utils/requestInterceptor';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.all('*', requestInterceptor);

/** Custom Hooks | Middlewares */
app.use('/', siteRoutes);
app.use('/admin', adminRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`🚀 Running at PORT ${port}`)
    })
}



const regularServer = http.createServer(app);
if(process.env.NODE_ENV === 'production' ) {
    // TODO: configurar SSL
    // TODO: rodar server na porta 80 e na 443

} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer) 
}