import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskDTO, TaskEntity } from '../task/task.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: Array<TaskEntity>;
}

export class UserDTO {
  id: number | undefined | null = null;
  tasks?: Array<TaskDTO>;
}
