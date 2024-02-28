import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignIn } from './dto/user-signin.dto';
import { UserSignUp } from './dto/user-signup.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/utility/guards/auth.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-role.decorator';
import { UserRole } from './dto/create-user.dto';
// import 
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('signup')
  signup(@Body() userSignUp: UserSignUp) {
    return this.userService.signup(userSignUp)
  }

  @Post('signin')
  async signin(@Body() userSignIn: UserSignIn) {
    const user = await this.userService.signin(userSignIn)
    const accessToken = await this.userService.accessToken(user)
    return [accessToken, user]
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  //
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthGuard, AuthorizeGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }
  @Get()
  findOne(@Query() query: any) {
    const { id } = query
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: User) {
    return currentUser
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

}
