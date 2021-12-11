import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}), //* Requerid to jwt and passport
    JwtModule.register({  //* Requerid to jwt and passport
      secret: 'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    })
  ],
  providers: [AuthService , JwtStrategy],
  exports: [JwtStrategy , PassportModule],
  controllers: [AuthController]
})
export class AuthModule {}
