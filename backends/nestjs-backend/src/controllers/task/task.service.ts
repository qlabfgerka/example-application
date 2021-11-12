import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/models/task/task.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async createTask(
    task: TaskEntity,
    userId: number,
  ): Promise<TaskEntity> {
    task.user = await this.usersRepository.findOne(userId);
    return await this.tasksRepository.save(task);
  }

  public async getTasks(userId: number): Promise<Array<TaskEntity>> {
    return await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where(`user.id = ${userId}`)
      .select([
        'task.id as id',
        'task.title as title',
        'task.description as description',
      ])
      .execute();
  }
}
