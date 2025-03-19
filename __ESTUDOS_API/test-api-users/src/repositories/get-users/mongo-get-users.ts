import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const users = await MongoClient.db
        .collection<Omit<User, "id">>('users')
        .find({})
        .toArray()
        
        return users.map(({_id, ...rest}) => ({
            ...rest,
            id: _id.toHexString(),
        }));
    }

}

// Troca de banco de dados
/*
export class PostgresUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [
            {
                firstName: 'PostLedson',
                lastName: 'PostRocha',
                email: 'postledson@rocha.com',
                password: 'post123'
            }
        ]
    }

}*/