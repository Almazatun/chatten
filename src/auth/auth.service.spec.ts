import { Test, TestingModule } from "@nestjs/testing";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { UserRepo } from "../user/user.repository";
import { User } from "../user/entities/user.entity";
import { RegisterUserDto } from "./dto/register-user.dto";

describe("AuthService", () => {
  let service: AuthService;

  const mockUserRepo = {
    save: jest.fn().mockImplementation((user: User): Promise<User> => new Promise(resolve => resolve(user))),
    getByEmail: jest.fn(() => undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({}),
        JwtModule.register({
          secret: "JWT_SECRET_KEY",
          signOptions: { expiresIn: "1h" },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UserRepo,
          useFactory: () => (mockUserRepo),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be successfully register new user", async () => {
    const registerUserDto: RegisterUserDto = {
      email: "test@mail.com",
      password: "12345678",
      username: "testUsername",
    };

    const res = await service.registerUser(registerUserDto);

    expect(res).toEqual(`User successfully registered with email:${registerUserDto.email}`);
  });

  it("should be fail with error message *User not found", async () => {
    const validateUserInput = {
      email: "test@mail.com",
      password: "12345678",
    };

    const { email, password } = validateUserInput;

    service.validateUser(email, password).then().catch((err) => {
      expect(err.message).toBe("User not found");
    });
  });
});
