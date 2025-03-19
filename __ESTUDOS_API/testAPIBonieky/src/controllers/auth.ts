import { error } from "console";
import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from '../services/authService';

export const login: RequestHandler = (req, res): any => {
    // TODO: tratar login
    const loginSchema = z.object({
        password: z.string()
    });
    const body = loginSchema.safeParse(req.body);
    if(!body.success) return res.json({error: 'Dados inválidos'})

     // TODO: Validar senha e gerar token
    if(!auth.validatePassword(body.data.password)) {
        return res.status(403).json({ error: 'Acesso negado!'})
    }

     res.json({token: auth.createToken()})
        // TODO: Retorno da requisição        
    
}

export const validate: RequestHandler = (req, res,  next): any => {
    if(!req.headers.authorization) {
        return res.status(403).json({error: 'Acesso negado'})
        
    }
    const token = req.headers.authorization.split(' ')[1];

    if(!auth.validateToken(token)) {
        return res.status(403).json({error: 'Acesso negado'})
    }

    next()
}