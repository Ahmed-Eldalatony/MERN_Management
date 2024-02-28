import { IsEmail, IsNotEmpty, MinLength, IsString } from "class-validator";
export class UserSignIn {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;


}
