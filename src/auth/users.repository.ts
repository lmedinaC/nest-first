import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDto

        //* Generete the salt 
        const salt = await bcrypt.genSalt();
        //* Hashed with the salt
        const hasshedPassowrd= await bcrypt.hash(password,salt);

        const user = this.create({
            username,
            password:hasshedPassowrd
        })

        try {
            await this.save(user);
        } catch (error) {
            if(error.code == '23505' )
                throw new ConflictException("Username already exist");
            else
                throw new InternalServerErrorException();
        }

    }
}