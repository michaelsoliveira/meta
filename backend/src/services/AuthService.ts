import { prismaClient } from "../database/prismaClient";
import { generateToken } from "../utils/generateToken";
import * as bcrypt from "bcryptjs"

export interface UserRequest {
    email: string;
    password: string;
}

class AuthService {

  async execute({ email, password }: UserRequest) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário informado não existe no banco de dados.');

    const isMatch = await bcrypt.compareSync(password, user?.password);
    if (!isMatch) throw new Error('A senha informada está incorreta');

    return { ...user, access_token: generateToken(user) };
  }
}

export default new AuthService();
