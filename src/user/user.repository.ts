import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  public async list() {
    return "Users";
  }

  public async save() {
    return "User create";
  }

  public async update(id: string) {
    return `Update ${String(id)}`;
  }

  public async findById(id: string) {
    return `FindById ${String(id)}`;
  }

  public async delete(id: string) {
    return `Delete ${String(id)}`;
  }
}
