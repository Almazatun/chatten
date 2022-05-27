import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { plainToClass } from "class-transformer";
import { BadRequestExc } from "../common/exceptions/bad-request.exception";
import { NotFoundExc } from "../common/exceptions/not-found.exception";
import { UserRepo } from "../user/user.repository";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "../user/entities/user.entity";
import { AuthUser, JwtPayload } from "./types";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepo,
    private jwtService: JwtService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto): Promise<string> {
    const { password, email } = registerUserDto;

    const [userDB, hashedPassword] = await Promise.all([
      this.userRepository.getByEmail(email),
      this.hashingPassword(password),
    ]);

    if (userDB) {
      throw new BadRequestExc("User already exists");
    }

    const registerUserDBType = plainToClass(User, {
      ...registerUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(registerUserDBType);

    return `User successfully registered with email:${email}`;
  }

  public async validateUser(email: string, password: string): Promise<AuthUser | void> {
    const userDB = await this.userRepository.getByEmail(email);

    if (userDB !== null && userDB !== undefined) {
      const token = this.jwtService.sign(this.createJwtPayload(userDB));
      const isMath = await bcrypt.compare(password, userDB.password);

      if (userDB && isMath) {
        return {
          id: userDB.id,
          username: userDB.username,
          email,
          accessToken: token,
        };
      }
      throw new BadRequestExc("User password incorrect");
    }
    throw new NotFoundExc("User not found");
  }

  private async hashingPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private createJwtPayload(user: User): JwtPayload {
    const { id, username, email } = user;
    return { id, username, email };
  }
}
