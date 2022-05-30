import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Group } from "../../group/entities/group.entity";
import { User } from "../../user/entities/user.entity";

@Entity("group_members")
export class GroupMember {
  @PrimaryColumn()
  public groupId!: string;

  @PrimaryColumn()
  public userId!: string;

  @ManyToOne(() => Group, group => group)
  public group!: Group;

  @ManyToOne(() => User, user => user)
  public user!: User;
}
