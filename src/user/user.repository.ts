import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  public async list() {
    return this.userRepo.find();
  }

  public async save(
    user: User,
  ): Promise<User> {
    return this.userRepo.save(user);
  }

  public async getByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
      select: ["password", "username", "email", "id"],
    });
  }

  public async get(id: string): Promise<User> {
    return this.userRepo.findOne(id);
  }

  public async getByIds(ids: string[]): Promise<User[]> {
    return this.userRepo.findByIds(ids);
  }

  public async remove(user: User): Promise<User> {
    return this.userRepo.remove(user);
  }
}
