import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username:string;

    @MinLength(6)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: "Password is too weak"
    })
    password:string;
}