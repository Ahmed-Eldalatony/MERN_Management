import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import { Task } from './task/entities/task.entity';
@Injectable()
export class AppService {
  constructor(
    // @InjectRepository(User) private userRepo:Repository<User>,
    // @InjectRepository(Task) private TaskRepo:Repository<Task>,

  ) { }

  // create(){
  //   
  //   const kkk
  // }
}
