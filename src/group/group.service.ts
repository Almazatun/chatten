import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";

import { GroupRepo } from "./group.repository";
import { GroupMemberRepo } from "../group-member/group-member.repository";
import { CreatGroupDto } from "./dto/creat-group.dto";
import { Group } from "./entities/group.entity";
import { UserRepo } from "../user/user.repository";
import { GroupMessages, SearchGroup, UserGroups } from "./types";
import { BadRequestExc } from "../common/exceptions/bad-request.exception";

@Injectable()
export class GroupService {
  constructor(
    private groupRepository: GroupRepo,
    private groupMemberRepository: GroupMemberRepo,
    private userRepository: UserRepo,
  ) {}

  public async getGroupsByUserId(userId: string): Promise<UserGroups> {
    const [ownGroups, userIncludeGroups] = await Promise.all([
      this.groupRepository.listByUserId(userId),
      this.groupMemberRepository.listByUserId(userId),
    ]);

    const joinedGroups = userIncludeGroups.map(({ groupId, group: { title } }) => ({ id: groupId, title }));

    return { ownGroups, joinedGroups };
  }

  public async getGroupsByTitle(title: string): Promise<SearchGroup[]> {
    const groups = await this.groupRepository.listByTitleForSearch(title);
    const searchGroups = groups.map(group => ({ id: group.id, title: group.title }));

    return searchGroups;
  }

  public async getGroupMessages(groupId: string): Promise<GroupMessages> {
    const group = await this.groupRepository.get(groupId);

    if (!group) {
      throw new BadRequestExc("Invalid group id");
    }

    const { id, title, messages } = group;
    const groupMessages: GroupMessages = {
      id,
      title,
      messages: messages.map(mess => ({ userId: mess.userId, id: mess.id, text: mess.text })),
    };

    return groupMessages;
  }

  public async create(userId: string, createGroupDto: CreatGroupDto):Promise<Group> {
    const now = new Date();
    const user = await this.userRepository.get(userId);

    if (!user) {
      throw new BadRequestExc("Invalid user id");
    }

    const groupTypeDB = plainToClass(Group, {
      ...createGroupDto,
      createdAt: now,
      updatedAt: now,
      user,
    });

    return this.groupRepository.save(groupTypeDB);
  }
}
