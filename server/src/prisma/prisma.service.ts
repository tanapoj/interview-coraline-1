import {Injectable} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
//implements OnModuleInit, OnModuleDestroy
export class PrismaService extends PrismaClient {
    // async onModuleDestroy() {
    //   await this.$connect();
    // }
    //
    // async onModuleInit() {
    //   await this.$disconnect();
    // }

    async getHighScore(): Promise<number> {
        const data = await this.gameStat.findFirst({
            where: {
                name: 'highScore',
            },
        })
        return data ? +data['value'] : 0
    }

    async setHighScore(newHighScore: number): Promise<number> {
        const data = await this.gameStat.upsert({
            where: {
                name: 'highScore',
            },
            update: {
                value: newHighScore,
            },
            create: {
                name: 'highScore',
                value: newHighScore,
            },
        })
        return data ? +data['value'] : 0
    }

    async getPlayerScore(name: string): Promise<number> {
        const data = await this.user.findFirst({
            where: {
                name,
            },
        })
        return data ? +data['score'] : 0
    }

    async setPlayerScore(name: string, score: number): Promise<number> {
        const data = await this.user.upsert({
            where: {
                name,
            },
            update: {
                score,
            },
            create: {
                name,
                score,
            },
        })
        return data ? +data['score'] : 0
    }
}
