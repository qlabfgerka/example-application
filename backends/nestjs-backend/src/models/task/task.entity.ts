import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}

export class TaskDTO {
  id?: number | undefined | null = null;
  title: string | undefined | null = null;
  description: string | undefined | null = null;
}
