
import express, { Request, Response } from "express";
import { Categoria, Perfil, Transacao, Usuario } from "../types";
import { PrismaClient, TipoTransaction } from "@prisma/client";
import { error, log, profile } from "node:console";

const prisma = new PrismaClient();

export const UserTransaction = () => {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        const transacoes = await prisma.transaction.findMany();
        res.json(transacoes);
    });

    router.get('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const transacao = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!transacao) res.status(404).end("Transacao não encontrada :(")
        res.json(transacao);
    });

    router.post('/', async (req: Request, res: Response) => {  
        const transacao = req.body as Transacao;
        const result = await prisma.transaction.create({           
            data: {
                 ... transacao,
                 tipo:  
                    transacao.tipo === "RECEITA"
                    ? TipoTransaction.RECEITA
                    : TipoTransaction.DESPESA,                            
             },
        });       
        res.json(result);
    });

    // router.delete('/:id', async (req: Request, res: Response) => {
    //     const { id } = req.params;
    //     const result = await prisma.transaction.delete({
    //         where: { id: parseInt(id) }
    //     });
    //     if (!id) res.status(404).end("Categoria não encontrada :(")
    //     res.json(result);
    // });

    // router.post('/', async (req: Request, res: Response) => {
    //     const { data } = req.body as Transacao
    //     const result = await prisma.transaction.create({
    //         data: { nome }
    //     });
    //     res.status(201).json(result);
    // });
    // return router
}




