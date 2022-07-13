import { Body, Controller, Post, Put, Request, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthUser, JwtUser } from "./types";

@Controller("auth/")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post("register")
  public register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    return this.authService.registerUser(registerUserDto);
  }

  @Post("confirm")
  public confirm(@Body("token") token: string): Promise<string> {
    return this.authService.confirmUserEmail(token);
  }

  @UseGuards(LocalAuthGuard)
  @Put("login")
  public async login(@Request() req):Promise<AuthUser> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put("me")
  async test(@Request() req): Promise<JwtUser> {
    return req.user;
  }
}
