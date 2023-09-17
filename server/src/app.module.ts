import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {LocalStrategy} from "./auth/local.strategy";
import {AuthService} from "./auth/auth.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, LocalStrategy],
})
export class AppModule {}
