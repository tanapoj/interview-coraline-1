import {Body, Controller, Get, ParseIntPipe, Post, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {PrismaService} from './prisma/prisma.service';
import {RecordHighScoreDto} from './dto/RecordHighScoreDto';
import {UserLoginDto} from "./dto/UserLoginDto";
import {LocalStrategy} from "./auth/local.strategy";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly db: PrismaService,
        private readonly auth: LocalStrategy,
    ) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/test')
    getTest(): string {
        return 'test';
    }

    @Post('/score')
    async postHighScore(@Body() body: RecordHighScoreDto, @Query('user') name?: string) {
        let highScore = await this.db.getHighScore()
        if (body.score > highScore) {
            highScore = await this.db.setHighScore(body.score)
        }

        await this.db.setPlayerScore(name, body.score)
        const score = name ? await this.db.getPlayerScore(name) : 0

        return {
            score,
            highScore,
        }
    }

    @Get('/score')
    async getHighScore(@Query('user') name?: string) {
        const highScore = await this.db.getHighScore()

        const score = name ? await this.db.getPlayerScore(name) : 0

        return {
            score,
            highScore,
        }
    }

    @Get('/play')
    getPlay() {
        const result = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
        return {
            result,
        }
    }

    @Post('/user')
    async postUser(@Body() body: UserLoginDto) {
        const user = await this.auth.validate(body.name, body.password)
        return {
            ...user,
        }
    }
}
