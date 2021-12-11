import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskState } from "./tasks-estate.enum";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    state: TaskState;

    @ManyToOne(_type => User, user => user.tasks , {eager : false})
    @Exclude({ toPlainOnly : true})
    user: User;
}