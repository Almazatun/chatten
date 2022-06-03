import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
import { CreatGroupDto } from "./dto/creat-group.dto";

@Controller("groups/")
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":userId")
  public async createGroup(
    @Param("userId") userId: string,
    @Body() createGroupDto: CreatGroupDto,
  ): Promise<Group> {
    return this.groupService.create(userId, createGroupDto);
  }
}
