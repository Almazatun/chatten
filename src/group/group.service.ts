import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";

import { GroupRepo } from "./group.repository";
import { CreatGroupDto } from "./dto/creat-group.dto";
import { Group } from "./entities/group.entity";
import { UserRepo } from "../user/user.repository";

@Injectable()
export class GroupService {
  constructor(
    private groupRepository: GroupRepo,
    private userRepository: UserRepo,
  ) {}

  public async create(userId: string, createGroupDto: CreatGroupDto):Promise<Group> {
    const now = new Date();
    const user = await this.userRepository.get(userId);

    const groupTypeDB = plainToClass(Group, {
      ...createGroupDto,
      createdAt: now,
      updatedAt: now,
      user,
    });

    return this.groupRepository.save(groupTypeDB);
  }

  // public async findGroupByTitle(): P {
  //
  // }
}
