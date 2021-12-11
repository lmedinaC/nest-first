import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({
        message: 'El nombre es obligatorio',
    })
    @MaxLength(10, {
        message: 'El nombre debe tener máximo $constraint1 caracteres',
    })
    name: string;

    @IsNotEmpty({
        message: 'La descripción es obligatoria',
    })
    description: string;
}