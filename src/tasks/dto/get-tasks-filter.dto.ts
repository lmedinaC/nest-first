import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskState } from '../tasks-estate.enum';

export class GetTasksFilterDto{
    @IsOptional()
    @IsEnum(TaskState,{
        message: "The state selected is not exist"
    })
    state?: TaskState;

    @IsOptional()
    @IsString()
    search?: string
}