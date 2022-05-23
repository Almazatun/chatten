import { Injectable } from "@nestjs/common";

import { UsersRepo } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepo,
  ) {}
}
