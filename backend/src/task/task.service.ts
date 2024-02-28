import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepositery: Repository<User>,
  ) { }

  async create(id, CreateTaskDto: CreateTaskDto) {
    // const newTask = this.taskRepository.create(CreateTaskDto);
    const taskOwner = await this.userRepositery.findOneBy(id)
    console.log('this is the task owner', taskOwner)
    const newTask = this.taskRepository.create({ ...CreateTaskDto, user: taskOwner })
    // await this.taskRepository.save(newTask)
    return this.taskRepository.save(newTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    task.title = updateTaskDto.title;
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

//
// {
//     "category": "No category",
//     "title": "Ahmed's task",
//     "description": "whatever",
//     "dueDate": "2024-02-25T12:00:00Z",
//     "user": {
//         "isRegisterd": false,
//         "role": "user",
//         "id": 41,
//         "userName": "Ahmed",
//         "password": "1162fadfad",
//         "linkedInData": {
//             "userName": "Ahmed",
//             "link": "https://www.linkedin.com/in/ahmed-dalton/",
//             "photoURL": "https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png",
//             "description": "whatever"
//         },
//         "email": "Dalton@mail.com",
//         "verifyToken": "test",
//         "verifyTokenExpiry": 1234355
//     },
//     "id": 51,
//     "isCompleted": false
// }
