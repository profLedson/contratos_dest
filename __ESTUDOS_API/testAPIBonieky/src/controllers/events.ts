import { RequestHandler } from "express";
import * as eventsService from '../services/eventsService'
import { z } from "zod";


export const getAll: RequestHandler = async (req, res): Promise<any> => {
    const items = await eventsService.getAll();

    if (items) return res.json({ events: items });

    res.json({ error: 'Ocorreu um erro' })

}

export const getEvent: RequestHandler = async (req, res): Promise<any> => {
    const { id } = req.params
    const eventItem = await eventsService.getOne(parseInt(id))
    if (eventItem) return res.json({ event: eventItem })

    res.json({ error: 'Ocorreu um erro' })
}

export const addEvent: RequestHandler = async (req, res): Promise<any> => {
    /**
     * TODO: Validar os Dados
     * Consultar service para fazer a inserção no DB
     * Retornar dados inseridos
     */
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string()

    });

    const body = addEventSchema.safeParse(req.body)
    console.log(body.success)
    if (!body.success) return res.json({ error: 'Dados inváaalidos' })

    const newEvent = await eventsService.add(body.data);
    if (newEvent) return res.status(201).json({ event: newEvent })

    res.json({ error: 'Ocorreu um erro aqui...' })
}

export const updateEvent: RequestHandler = async (req, res): Promise<any> => {
    const { id } = req.params;

    const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional()
    });

    const body = updateEventSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados inválidos' })

    const updateEvent = await eventsService.update(parseInt(id), body.data);
    if (updateEvent) {
        if(updateEvent.status) {
            // TODO: Fazer o sorteio
            
        }
        return res.json({ event: updateEvent })
    }

    res.json({ error: 'Ocorreu um erro' })

}