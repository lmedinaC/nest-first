import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskState } from "./tasks-estate.enum";
import { InternalServerErrorException, Logger } from '@nestjs/common'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger("TaskEntityRepository", { timestamp: true });

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { name, description } = createTaskDto;
        const task = this.create({
            name,
            description,
            state: TaskState.OPEN,
            user
        })
        await this.save(task);
        return task;
    }

    async getTasks(tasksFilterDeto: GetTasksFilterDto): Promise<Task[]> {
        try {
            const { state, search } = tasksFilterDeto;
            const query = this.createQueryBuilder('task');

            if (state)
                query.andWhere('task.state =:state', { state })

            if (search) {
                query.andWhere('LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', {
                    search: `%${search}%`
                })
            }

            const tasks = query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`the query ${JSON.stringify(tasksFilterDeto)} was failed: `, error.stack)
            throw new InternalServerErrorException();
        }
    }

    async getUserTasks(tasksFilterDeto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { state, search } = tasksFilterDeto;
        const userId = user.id;

        const query = this.createQueryBuilder('task');

        query.where({ user })

        if (state)
            query.andWhere('task.state =:state', { state })

        if (search) {
            query.andWhere('(LOWER(task.name) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', {
                search: `%${search}%`
            })
        }

        const tasks = query.getMany();
        return tasks;
    }

}