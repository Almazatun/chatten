import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  readonly username!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, {
    message: "Invalid email address",
  })
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "Password is too short",
  })
  @MaxLength(20, {
    message: "Password is too long",
  })
  public password!: string;
}
