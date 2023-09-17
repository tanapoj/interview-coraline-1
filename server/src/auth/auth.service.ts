import {Injectable} from '@nestjs/common';
import {AppService} from "../app.service";
import {PrismaService} from "../prisma/prisma.service";
import {hash, compare} from '../utils/bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private readonly db: PrismaService,
    ) {
    }

    async createUser(username: string, password: string): Promise<any> {
        const newUser = await this.db.user.create({
            data: {
                name: username,
                password: await hash(password),
            }
        })
        if (newUser) {
            const {password, ...result} = newUser
            return result
        }
        return null
    }

    async getUser(username: string, password: string): Promise<any> {
        const user = await this.db.user.findFirst({
            where: {
                name: username,
            }
        })
        if (user != null && await compare(password, user['password'])) {
            const {password, ...result} = user
            return result
        }
        return null
    }
}
