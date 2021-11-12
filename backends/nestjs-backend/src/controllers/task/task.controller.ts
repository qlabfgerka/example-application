import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDTO, TaskEntity } from 'src/models/task/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async createTask(
    @Body('task') task: TaskEntity,
    @Body('userId') userId: number,
  ): Promise<TaskDTO> {
    return await this.taskService.createTask(task, userId);
  }

  @Get(':id')
  public async getTasks(@Param('id') userId: number): Promise<Array<TaskDTO>> {
    return await this.taskService.getTasks(userId);
  }

  @Delete(':id')
  public async removeTask(@Param('id') taskId: number): Promise<void> {
    return await this.taskService.removeTask(taskId);
  }

  @Put()
  public async editTask(@Body('task') task: TaskDTO): Promise<TaskDTO> {
    return await this.taskService.editTask(task);
  }
}
