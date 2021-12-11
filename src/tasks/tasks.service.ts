import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TaskState } from './tasks-estate.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import {Logger} from '@nestjs/common'

@Injectable()
export class TasksService {
    private logger = new Logger('TasksService');

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }

    getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(getTasksFilterDto);
    }

    getUserTasks(getTasksFilterDto: GetTasksFilterDto , user : User) : Promise<Task[]>{
        return this.taskRepository.getUserTasks(getTasksFilterDto,user);
    }

    async getTaskById(id: string, user : User): Promise<Task> {
        const found = await this.taskRepository.findOne({id,user});

        if (!found) throw new NotFoundException(`This task ${id} does not exist`)

        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async updateTaskState(id: string, state: TaskState, user : User): Promise<Task> {
        
        const task = await this.getTaskById(id, user);
        task.state = state;
        try {
            await this.taskRepository.save(task);
            return task;
        } catch (error) {
            this.logger.error(`User "${user.id}" can´t update the task: ${JSON.stringify(task)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
    

    async deleteTask(id: string, user : User): Promise<Object> {
        const result = await this.taskRepository.delete({id,user})

        if (result.affected === 0) throw new NotFoundException(`The task ${id} does not exist`);

        return {
            message: "Task deleted successfully",
            type: "success"
        }
    }

}
