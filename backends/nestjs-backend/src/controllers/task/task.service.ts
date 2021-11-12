import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDTO, TaskEntity } from 'src/models/task/task.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async createTask(task: TaskEntity, userId: number): Promise<TaskDTO> {
    task.user = await this.usersRepository.findOne(userId);
    const taskEntity: TaskEntity = await this.tasksRepository.save(task);
    return this.dtoFunctions.taskToDTO(taskEntity);
  }

  public async getTasks(userId: number): Promise<Array<TaskDTO>> {
    const tasks: Array<TaskEntity> = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where(`user.id = ${userId}`)
      .select([
        'task.id as id',
        'task.title as title',
        'task.description as description',
      ])
      .execute();
    return this.dtoFunctions.tasksToDTO(tasks);
  }

  public async removeTask(taskId: number): Promise<void> {
    await this.tasksRepository.delete(taskId);
    return;
  }

  public async editTask(task: TaskDTO): Promise<TaskDTO> {
    const update: TaskEntity = await this.tasksRepository.findOne(task.id);
    update.title = task.title;
    update.description = task.description;

    await this.tasksRepository.save(update);

    return this.dtoFunctions.taskToDTO(update);
  }
}
