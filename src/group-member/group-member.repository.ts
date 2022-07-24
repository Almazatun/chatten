import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { GroupMember } from "./entities/group-member.entity";

@Injectable()
export class GroupMemberRepo {
  constructor(
        @InjectRepository(GroupMember)
        private groupMemberRepo: Repository<GroupMember>,
  ) {}

  public async listByUserId(userId: string): Promise<GroupMember[]> {
    return this.groupMemberRepo.find({
      where: {
        userId,
      },
      relations: ["group"],
    });
  }
}
