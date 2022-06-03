import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Message } from "../../message/entities/message.entity";
import { GroupMember } from "../../group-member/entities/group-member.entity";
import { User } from "../../user/entities/user.entity";

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column()
  public title!: string;

  @Column({ nullable: true })
  public createdAt!: Date;

  @Column({ nullable: true })
  public updatedAt!: Date;

  @Column({ nullable: false })
  public userId!: string;

  @ManyToOne(() => User, user => user.groups)
  public user: User;

  @OneToMany(() => Message, message => message.user, {
    cascade: ["insert", "remove", "update"],
  })
  public messages: Message[];

  @OneToMany(() => GroupMember, groupMember => groupMember.group)
  public groupMembers: GroupMember[];
}
