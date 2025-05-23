import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'secret';
export type UserStoredToken = {
    id: string;
    email: string;
    username: string;
}

export function generateToken(user: User) {
  return jwt.sign(
        { id: user.id, email: user.email, username: user.username }, 
        SECRET, 
        { expiresIn: '1h' }
    );
}