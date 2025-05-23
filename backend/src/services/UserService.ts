import * as bcrypt from "bcryptjs"
import { User } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { generateToken } from '../utils/generateToken'

class UserService {
    async getAll(): Promise<UserType[]> {
        const users = await prismaClient.user.findMany()

        return users;
    }

    async create(data: any): Promise<User> {
        const { username, email, password } = data
        
        const userExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (userExists) {
            throw new Error("Já existe um usuário cadastrada com este nome.");
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user: any = await prismaClient.user.create({
            data: {
                username,
                email,
                password: passwordHash 
            }
        });
        const access_token = generateToken(user);

        return { ...user, access_token};
    }

    async update(id: string, data: any) : Promise<User> {
        const user = await prismaClient.user.update({
            where: {
                id
            },
            data
        });

        return user;
    }

    async findById(id: string): Promise<any> {
        const user = await prismaClient.user.findUnique({
            where: { id }
        });

        return user;
    }

    async delete(id: any) : Promise<any> {
        try {
            return await prismaClient.user.delete({
                where: { id }
            }).then(() => {
                return {
                    error: false,
                    message: 'User Deletada com Sucesso!'
                }
            }).catch((e) => {
                return {
                    error: true,
                    message: e.message
                }
            });
        } catch(e: any) {
            console.log(e);
            return {
                error: true,
                message: e.message
            }
        }
    }
}

export default new UserService;