import { Injectable } from '@nestjs/common';
import { TaskDTO, TaskEntity } from 'src/models/task/task.entity';
import { UserDTO, UserEntity } from 'src/models/user/user.entity';

@Injectable()
export class DtoFunctionsService {
  public userToDTO(user: UserEntity): UserDTO {
    const userDTO: UserDTO = {
      id: user.id,
    };

    return userDTO;
  }

  public taskToDTO(task: TaskEntity): TaskDTO {
    const taskDTO: TaskDTO = {
      id: task.id,
      title: task.title,
      description: task.description,
    };

    return taskDTO;
  }

  public tasksToDTO(tasks: Array<TaskEntity>): Array<TaskDTO> {
    const tasksDTO = new Array<TaskDTO>();

    tasks.forEach((task: TaskEntity) => {
      tasksDTO.push(this.taskToDTO(task));
    });

    return tasksDTO;
  }
}
