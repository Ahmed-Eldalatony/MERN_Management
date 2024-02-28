import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, Timestamp } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { UserRole } from '../dto/create-user.dto';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ select: false })
  password: string;

  @Column('json')
  linkedInData: {
    userName: string;
    link: string;
    photoURL: string;
    description: string;
  };

  @Column({ unique: true })
  email: string;

  @Column()
  isRegisterd: boolean = false;

  // @Column()
  // verifyToken: string;
  //
  // @Column()
  // verifyTokenExpiry: string
  //
  @Column({ type: 'enum', enum: UserRole, default: [UserRole.User] })
  role: UserRole = UserRole.User

  @OneToMany(type => Task, task => task.user, { cascade: true })
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
