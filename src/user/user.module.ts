import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepo } from "./user.repository";

import { User } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserRepo],
  providers: [
    UserService,
    UserRepo,
  ],
})
export class UserModule {}
