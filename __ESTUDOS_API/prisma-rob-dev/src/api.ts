
// https://www.youtube.com/watch?v=JTGhlAa085g&list=PLWZ62tgx0eREE9zQaMenFC8It4yv_yOHO&index=5

import express, { NextFunction, Request, RequestHandler, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { log } from 'console';
import 'express-async-errors'

const prisma = new PrismaClient();
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = 3000

app.get("/usuarios", async (req: Request, res: Response) => {
    const usuarios = await prisma.user.findMany()
    res.json(usuarios)
})
app.get("/usuarios/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const usuarios = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        res.json(usuarios)
    } catch (error) {
        res.status(404).end('Não encontrado')
    }
})

app.put("/usuarios/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const { nome, senha } = req.body as Usuario
    const result = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: { nome, senha }
    })
    if (!result) {
        res.status(404).end()
    }
    res.json(result)
})

type Usuario = {
    nome: string
    email: string
    senha: string
}

app.post("/usuarios", async (req, res) => {
    const usuario = await req.body as Usuario
    try {
        const result = await prisma.user.create({
            data: usuario
        })
        res.status(201).json(result)
    } catch (error) {
        res.sendStatus(500).end("Erro ao inserir valor")
    }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log(err)
    res.statusMessage
})

const server = app.listen(PORT, () => {
    console.table(`Listening http://localhost:${PORT}`)
})

const close = () => {
    server.close(async () => {
        log("\t>> Parando server e Prisma")
        await prisma.$disconnect()
    })
}
process.on("SIGINT", close)