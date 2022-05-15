import { Injectable } from "@nestjs/common";

import { UserRepo } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepo,
  ) {}

  create() {
    return this.userRepository.save();
  }

  findAll() {
    return this.userRepository.list();
  }

  findOne(id: string) {
    return this.userRepository.findById(id);
  }

  update(id: string) {
    return this.userRepository.update(id);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
