import { Test, TestingModule } from "@nestjs/testing";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { CanActivate } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepo } from "../user/user.repository";
import { User } from "../user/entities/user.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

describe("AuthController", () => {
  let controller: AuthController;

  const mockAuthService = {
    registerUser: jest
      .fn()
      .mockImplementation((user: User): string => `User successfully registered with email:${user.email}`),
  };

  beforeEach(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({}),
        JwtModule.register({
          secret: "JWT_SECRET_KEY",
          signOptions: { expiresIn: "1h" },
        }),
      ],
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useFactory: () => mockAuthService,
      }, {
        provide: UserRepo,
        useFactory: () => ({}),
      }],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should be successfully register user", () => {
    const registerUserDto: RegisterUserDto = {
      email: "test@mail.com",
      password: "12345678",
      username: "testUsername",
    };
    const res = controller.register(registerUserDto);
    expect(res).toEqual(`User successfully registered with email:${registerUserDto.email}`);
  });
});
