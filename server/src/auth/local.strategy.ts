import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        let user = await this.authService.getUser(username, password)
        if (!user) {
            try {
                user = await this.authService.createUser(username, password)
            } catch (e) {
            }
        }
        return user
    }
}