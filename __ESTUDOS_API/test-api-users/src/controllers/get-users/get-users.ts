import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {

    constructor(private readonly getUsersRepository: IGetUsersRepository) {
    }

    async handle() {
        // Validar Requisição
        // Direcionar chamada para repository
        try {
            const users = await this.getUsersRepository.getUsers();
            return {
                statusCode: 200,
                body: users
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong."
            }
        }
    }
}