import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/models/task/task.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([TaskEntity, UserEntity]),
    DtoFunctionsModule,
  ],
})
export class TaskModule {}
