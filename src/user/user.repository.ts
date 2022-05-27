import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepo {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async list() {
    return this.usersRepository.find();
  }

  public async save(
    user: User,
  ): Promise<User> {
    return this.usersRepository.save(user);
  }

  public async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: ["password", "username", "email", "id"],
    });
  }

  public async get(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  public async getByIds(ids: string[]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  public async remove(user: User): Promise<User> {
    return this.usersRepository.remove(user);
  }
}
