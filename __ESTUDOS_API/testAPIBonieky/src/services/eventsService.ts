import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.event.findMany();
    } catch (error) {
        return false;
    }
    //https://www.youtube.com/watch?v=mKa1MuB1HMk

}

export const getOne = async (id:number) => {
    try {
        return await prisma.event.findFirst({
            where: {id}
        });
    } catch (error) {
        return false;
    }
}

type EventCreateData = Prisma.Args<typeof prisma.event, 'create'>['data']
export const add = async (data: EventCreateData) => {
    try {
        return await prisma.event.create({data})
    } catch(err) {
        return false;
    }
}

type EventUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data']
export const update = async (id: number, data: EventUpdateData) => {
    try { return await prisma.event.update({ where: {id}, data})
    } catch (error) { return false }
}