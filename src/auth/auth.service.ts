import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { plainToClass } from "class-transformer";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

import { BadRequestExc } from "../common/exceptions/bad-request.exception";
import { NotFoundExc } from "../common/exceptions/not-found.exception";
import { UserRepo } from "../user/user.repository";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "../user/entities/user.entity";
import { AuthUser, JwtPayload, VerificationPayload } from "./types";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  private logger: Logger = new Logger("AUTH_SERVICE");
  constructor(
    private userRepository: UserRepo,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto): Promise<string> {
    const token = this.jwtService.sign(registerUserDto, {
      secret: this.configService.get<string>("jwtVerificationTokenSecret"),
      expiresIn: this.configService.get<string>("jwtVerificationTokenExpirationTime"),
    });

    await this.mailService.sendUserConfirmation(registerUserDto.email, token);

    return `Please check your email address: ${registerUserDto.email}`;
  }

  public async confirmUserEmail(token: string) {
    let verificationPayload: VerificationPayload;

    try {
      const decodedData = await this.decodeConfirmationToken(token);
      if (decodedData) {
        verificationPayload = decodedData;
      }
    } catch (error) {
      this.logger.error(error);
    }

    const [userDB, hashedPassword] = await Promise.all([
      this.userRepository.getByEmail(verificationPayload.email),
      this.hashingPassword(verificationPayload.password),
    ]);

    if (userDB) {
      throw new BadRequestExc("User already exists");
    }

    const registerUserDBType = plainToClass(User, {
      ...verificationPayload,
      password: hashedPassword,
    });

    await this.userRepository.save(registerUserDBType);

    return `User successfully registered with email:${verificationPayload.email}`;
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | void> {
    const userDB = await this.userRepository.getByEmail(email);

    if (this.isValidUser(userDB)) {
      if (await this.isMathUserPassword(password, userDB)) {
        const { id, username } = userDB;
        return {
          id,
          username,
          email,
          accessToken: this.generateJwt(userDB),
        };
      }
      throw new BadRequestExc("User password incorrect");
    }
    throw new NotFoundExc("User not found");
  }

  private async decodeConfirmationToken(token: string): Promise<VerificationPayload | void> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });

      const payloadKeys = Object.keys(payload);
      const isIncludePassword = payloadKeys.includes("password");
      const isIncludeEmail = payloadKeys.includes("email");

      if (typeof payload === "object" && isIncludePassword && isIncludeEmail) {
        const { email, password, username } = payload;
        return { email, password, username };
      }
      throw new BadRequestException();
    } catch (error) {
      this.logger.error(error?.name);
      this.logger.error(error);
      if (error?.name === "TokenExpiredError") {
        throw new BadRequestException("Email confirmation token expired");
      }
      throw new BadRequestException("Bad confirmation token");
    }
  }

  private async hashingPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private isValidUser(user: User): boolean {
    return user !== null && user !== undefined;
  }

  private isMathUserPassword(password: string, user: User): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  private generateJwt(user: User): string {
    return this.jwtService.sign(this.jwtPayload(user));
  }

  private jwtPayload(user: User): JwtPayload {
    const { id, username, email } = user;
    return { id, username, email };
  }
}
