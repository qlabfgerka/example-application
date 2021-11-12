import { Body, Controller, Post } from '@nestjs/common';
import { TaskEntity } from 'src/models/task/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async createTask(
    @Body('task') task: TaskEntity,
    @Body('userId') userId: number,
  ): Promise<TaskEntity> {
    return await this.taskService.createTask(task, userId);
  }
}
