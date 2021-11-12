import { TaskDTO } from '../task/task.model';

export class UserDTO {
  id: number | undefined | null = null;
  tasks?: Array<TaskDTO>;
}
