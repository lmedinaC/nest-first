import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStateDto } from './dto/update-task-state.dto';
import { Task } from './task.entity';
import { TaskState } from './tasks-estate.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterTaskDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterTaskDto)
    }

    @Get('/by-user')
    getUserTasks(@Query() filterTaskDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getUserTasks(filterTaskDto,user)
    }


    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user : User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Patch('/:id/state')
    updateTaskState(@Param('id') taskId: string, @Body() updateTaskStateDto: UpdateTaskStateDto, @GetUser() user : User): Promise<Task> {
        const { state } = updateTaskStateDto;
        return this.tasksService.updateTaskState(taskId, state , user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') taskId: string , @GetUser() user : User): Promise<Object> {
        return this.tasksService.deleteTask(taskId,user);
    }
}
