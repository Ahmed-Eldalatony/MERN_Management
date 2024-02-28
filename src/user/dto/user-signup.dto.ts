import { IsString, IsNotEmpty, MinLength, IsEmail, IsObject } from "class-validator";
import { UserSignIn } from "./user-signin.dto";

export class UserSignUp extends UserSignIn {

  @IsNotEmpty({ message: 'Please provide a name' })
  @IsString({ message: 'Must be a String' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  userName: string

  @IsNotEmpty()
  @IsObject()
  linkedInData: object;
}
