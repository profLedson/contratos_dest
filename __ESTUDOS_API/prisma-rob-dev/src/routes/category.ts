
import express, { Request, Response } from "express";
import { Categoria, Perfil, Usuario } from "../types";
import { PrismaClient } from "@prisma/client";
import { error, log, profile } from "node:console";

const prisma = new PrismaClient();

export const UserCategory = () => {
    const router = express.Router();

    router.get('/', async (req:Request, res:Response) => {
        const categorias = await prisma.category.findMany();
        res.json(categorias);
    });

    router.get('/:id', async (req:Request, res:Response) => {
        const {id} = req.params;
        const categoria = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if(!categoria) res.status(404).end("Categoria não encontrada :(")
        res.json(categoria);
    });

    router.put('/:id', async (req:Request, res:Response) => {
        const {id} = req.params;
        const {nome} = req.body as Categoria;
        const result = await prisma.category.update({
            where: { id: parseInt(id)},
            data: { nome }
        });
        if(!nome) res.status(404).end("Nome Categoria não encontrada :(")
        res.json(result);
    });

    router.delete('/:id', async (req:Request, res:Response) => {
        const {id} = req.params;        
        const result = await prisma.category.delete({
            where: { id: parseInt(id)}
        });
        if(!id) res.status(404).end("Categoria não encontrada :(")
        res.json(result);
    });

    router.post('/', async (req:Request, res:Response) => {
        const { nome } = req.body as Categoria       
        const result = await prisma.category.create({
            data: { nome }
        });
        res.status(201).json(result);
    });
    return router
}




