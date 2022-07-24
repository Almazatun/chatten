import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
import { CreatGroupDto } from "./dto/creat-group.dto";
import { GroupMessages, SearchGroup, UserGroups } from "./types";

@Controller("groups/")
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":userId")
  public async getGroupsByUserId(
      @Param("userId") userId: string,
  ): Promise<UserGroups> {
    return this.groupService.getGroupsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":groupId/messages")
  public async getGroupMessages(
      @Param("groupId") groupId: string,
  ): Promise<GroupMessages> {
    return this.groupService.getGroupMessages(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":title")
  public async getGroupsByTitle(
      @Param("title") title: string,
  ): Promise<SearchGroup[]> {
    return this.groupService.getGroupsByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":userId")
  public async createGroup(
    @Param("userId") userId: string,
    @Body() createGroupDto: CreatGroupDto,
  ): Promise<Group> {
    return this.groupService.create(userId, createGroupDto);
  }
}
