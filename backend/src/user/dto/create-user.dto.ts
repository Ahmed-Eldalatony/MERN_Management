import { IsEnum, IsEmail, IsString, IsNumber, IsNotEmpty, IsObject, IsBoolean, MinLength, isString } from 'class-validator'
export enum UserRole {
  Admin = "admin",
  Editor = "editor",
  User = "user"
}
// YOU HAVEN'T YET IMPLEMENTED THIS SCHEME IN THE ENTITY FOR USER 
export class CreateUserDto {
  @IsNotEmpty({ message: 'Please provide a name' })
  @IsString({ message: 'Must be a String' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  @IsObject()
  linkedInData: object;

  @IsBoolean()
  isRegisterd: boolean = false;
  //
  // @IsString({ message: 'Error: Faild to Generate token' })
  // verifyToken: string;
  //
  // @IsString()
  // verifyTokenExpiry: string

  @IsEnum(UserRole)
  role: UserRole = UserRole.User
}
