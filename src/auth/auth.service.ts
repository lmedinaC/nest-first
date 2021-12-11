import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDTO): Promise<{accessToken : string}> {
        const {username, password} = authCredentialsDto;

        const user = await this.userRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            const payload : JwtPayload = {username};
            const accessToken : string = await this.jwtService.sign(payload);
            return {accessToken}
        }else{
            throw new UnauthorizedException("Plsease check your credentials.")
        }
    }
}
