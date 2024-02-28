import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUp } from './dto/user-signup.dto';
import { UserSignIn } from './dto/user-signin.dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async signup(userSignUp: UserSignUp) {
    const userExists = await this.findUserByEmail(userSignUp.email)
    if (userExists) throw new BadRequestException('Email is  not available ')
    userSignUp.password = await hash(userSignUp.password, 10)

    return this.usersRepository.create(userSignUp)
    // user = await this.usersRepository.save(user)
    // delete user.password

    // return user
  }


  async signin(userSignIn: UserSignIn) {
    const userExists = await this.usersRepository.createQueryBuilder('user').addSelect('user.password').where('user.email=:email', { email: userSignIn.email }).getOne()
    if (!userExists) throw new BadRequestException('Bad Credentials')

    const matchPassword = await compare(userSignIn.password, userExists.password)
    if (!matchPassword) throw new BadRequestException('Bad Credentials')
    delete userExists.password
    return userExists
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.userName = updateUserDto.userName;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found')
    return user

  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async accessToken(user: User) {
    return sign({ id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '30m' })
  }
}
