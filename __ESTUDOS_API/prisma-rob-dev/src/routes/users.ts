
import express, { Request, Response } from "express";
import { Perfil, Usuario } from "../types";
import { PrismaClient } from "@prisma/client";
import { error, log, profile } from "node:console";

const prisma = new PrismaClient();

const UserRouter = () => {

    const router = express.Router();

    router.post("/", async (req, res) => {
        const usuario = await req.body as Usuario
        try {
            const result = await prisma.user.create({
                data: {
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: usuario.senha
                }
            })
            
            res.status(201).json(result)
        } catch (error) {
            res.sendStatus(500).end("Erro ao inserir valor")
        }
    })

    router.post("/:id/perfil", async (req: Request, res: Response) => {
        const { id } = req.params
        const perfil = req.body as Perfil        
        
        const result = await prisma.profile.upsert({
            where: {
                userId: parseInt(id)
            },
            create: {             
                userId: parseInt(id),
                foto: perfil.foto
            },
            update: {
                foto: perfil.foto
            }
        });
        res.status(201).json(result)
    });
   
    router.get("/", async (req: Request, res: Response) => {
        const usuarios = await prisma.profile.findMany();     
        res.json(usuarios);

    })
    router.get("/", async (req: Request, res: Response) => {
        const usuarios = await prisma.user.findMany();     
        res.json(usuarios);

    })
    router.get("/:id", async (req: Request, res: Response) => {
        const { id } = req.params
        const perfil = await prisma.profile.findUnique({
            where: {
                userId: parseInt(id)
            }
        });     
        res.status(200).json(perfil);

    })
    
    router.get("/:id/perfil", async (req: Request, res: Response) => {
        const { id } = req.params
        const perfil = await prisma.profile.findUnique({
            where: {
                userId: parseInt(id)
            }
        });     
        res.status(200).json(perfil);

    })
    router.delete("/:id/perfil", async (req: Request, res: Response) => {
        const { id } = req.params
        const perfil = await prisma.profile.delete({
            where: {
                userId: parseInt(id)
            }
        });     
        res.status(200).json(perfil);

    })

    router.put("/:id", async (req: Request, res: Response) => {
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
    router.delete("/:id", async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!result) {
            res.status(404).end("Não foi possível deletar usuário")
            throw error("Não foi possível deletar usuário\n");
        }
        res.json({ "sucess": "Deletado com sucesso!" })
    })

    return router;
}

export default UserRouter;






