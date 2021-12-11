import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { QueryFailedErrorException } from './handler-exceptions/query-failed-error-exception.filter';


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3030,
      username: 'postgres',
      password: 'postgres',
      database: 'task-managment',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule
  ],


})
export class AppModule {}
