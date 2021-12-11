import { IsEnum } from "class-validator";
import { TaskState } from "../tasks-estate.enum";

export class UpdateTaskStateDto{
    @IsEnum(TaskState,{
        message : "El estado seleccionado no existe."
    })
    state : TaskState
}