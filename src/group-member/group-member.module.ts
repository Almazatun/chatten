import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GroupMember } from "./entities/group-member.entity";
import { GroupMemberRepo } from "./group-member.repository";

@Module({
  imports: [TypeOrmModule.forFeature([GroupMember])],
  controllers: [],
  exports: [GroupMemberRepo],
  providers: [
    GroupMemberRepo,
  ],
})
export class GroupMemberModule {}
