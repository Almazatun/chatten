import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Group } from "./entities/group.entity";
import { GroupService } from "./group.service";
import { UserModule } from "../user/user.module";
import { GroupController } from "./group.controller";
import { GroupRepo } from "./group.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Group]),
    UserModule,
  ],
  controllers: [GroupController],
  exports: [],
  providers: [GroupService, GroupRepo],
})
export class GroupModule {}
