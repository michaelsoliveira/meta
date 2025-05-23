import { Request, Response } from "express";
import userService from "../services/UserService";
import { prismaClient } from "../database/prismaClient";

export class UserController {
    async store(request: Request, response: Response) : Promise<Response> {
        try {
            const user = await userService.create(request.body);
            return response.json({
                error: false,
                data: user,
                message: `User ${user.username} foi cadastrada com SUCESSO!!!`
            })
        } catch (error: any) {
            console.log(error.message);
            return response.json({
                error: true,
                message: error.message
            });
        }
    }

    async update(request: Request, response: Response) : Promise<any> {
        const { id } = request.params
        try {
            const user = await userService.update(id, request.body);
            return response.json({
                error: false,
                data: user,
                message: `User ${user.username} foi atualizada com SUCESSO!!!`
            })
        } catch (error: any) {
            console.log(error.message);
            return response.json({
                error: true,
                message: error.message
            });
        }
    }
    async findAll(request: Request, response: Response) : Promise<any> {
        try {
            const users = await userService.getAll();
            
            return response.json({
                error: false,
                data: users
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: error.message
            });
        }
    }

    async delete(request: Request, response: Response) : Promise<any> {
        const { id } = request.params;
        const res: any = await userService.delete(id);
        return response.status(200).json({
            error: res.error,
            message: res.message
        })
    }

    async findOne(request: Request, response: Response) : Promise<any> {
        const { id } = request.params as any;
        try {
            const user = await userService.findById(id);
            return response.status(200).json({
                user
            })
        } catch(e: any) {
            return {
                error: true,
                message: e.message
            }
        }
        
    }
}