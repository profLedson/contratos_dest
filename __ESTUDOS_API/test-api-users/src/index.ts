import express from 'express'
import { config } from 'dotenv'
import { MongoUsersRepository } from './repositories/get-users/mongo-get-users';
import { GetUsersController } from './controllers/get-users/get-users';
import { MongoClient } from './database/mongo';


// https://www.youtube.com/watch?v=gU3kp7Aw0JI&t=1068s (tutorial)

const main = async () => {
    
    config();
    const app = express()
    
    await MongoClient.connect();

    app.get('/users', async (req, res) => {
        const mongoUsersRepository = new MongoUsersRepository();
        const getUsersController = new GetUsersController(mongoUsersRepository);
        const {body, statusCode} = await getUsersController.handle();
        
        res.send(body).status(statusCode);
    })
    
    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log(`Running ${port} - http://localhost:${port}`)
    })
}

main()