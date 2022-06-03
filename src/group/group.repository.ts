import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Group } from "./entities/group.entity";

@Injectable()
export class GroupRepo {
  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
  ) {}

  public async save(group: Group): Promise<Group> {
    return this.groupRepo.save(group);
  }

  public async get(id: string): Promise<Group> {
    return this.groupRepo.findOne(id);
  }

  public async remove(group: Group): Promise<Group> {
    return this.groupRepo.remove(group);
  }
}
