import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Message } from "../../message/entities/message.entity";
import { GroupMember } from "../../group-member/entities/group-member.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column()
  public email!: string;

  @Column()
  public username!: string;

  @Column({ select: false })
  public password!: string;

  @Column({ nullable: true })
  public createdAt!: Date;

  @Column({ nullable: true })
  public updatedAt!: Date;

  @OneToMany(() => Message, message => message.user)
  public messages: Message[];

  @OneToMany(() => GroupMember, groupMember => groupMember.user)
  public groupMembers: GroupMember[];
}
