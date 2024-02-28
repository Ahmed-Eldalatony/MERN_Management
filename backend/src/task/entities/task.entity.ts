import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskCategory } from '../dto/create-task.dto';
import { User } from 'src/user/entities/user.entity';
@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  category: TaskCategory = TaskCategory.NoCategory

  @ManyToOne(type => User, user => user.tasks, { onDelete: 'SET NULL' })
  user: User;
}
