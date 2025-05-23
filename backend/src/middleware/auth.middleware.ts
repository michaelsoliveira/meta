import { NextFunction, Request, Response } from "express"
import * as jwt from 'jsonwebtoken'
import userService from "../services/UserService";

export const Authentication = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { authorization } = request.headers;
        const SECRET = process.env.JWT_SECRET || 'secret';

        if (!authorization) {
            return response.status(401).json({
                error: 'Token is missing!'
            })
        }

        const token = authorization.replace('Bearer', '').trim();
        try {
            const verificationResponse: any = jwt.verify(token, SECRET);
            const user = await userService.findById(verificationResponse.id)
            request.user = {
                id: user.id,
                email: user.email,
                username: user.username
            }

            return next();
        } catch (error: any) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }
}