import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: Array<TaskEntity>;
}
