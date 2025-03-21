
// https://www.youtube.com/watch?v=JTGhlAa085g&list=PLWZ62tgx0eREE9zQaMenFC8It4yv_yOHO&index=5

import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import { error, log } from 'console';
import 'express-async-errors'
import UserRouter  from './routes/users';
import { PrismaClient } from '@prisma/client';
import { UserCategory } from './routes/category';

const prisma = new PrismaClient();
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/usuarios", UserRouter());
app.use("/categorias", UserCategory());

const PORT = 3000

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log(err)
    res.statusMessage
})

const server = app.listen(PORT, () => {
    console.table(`Listening http://localhost:${PORT}`)
})

const close = () => {
    server.close(async () => {
        log("\t>> Parando server e Prisma...\n")
        log("\t>> ================================\n")
        await prisma.$disconnect();
        log("\t>> Conexão DB e App finalizadas\n")
        log("\t>> ================================\n")
    })
}
process.on("SIGINT", close)