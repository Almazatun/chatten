import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Group } from "../../group/entities/group.entity";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column()
  public text!: string;

  @Column({ nullable: true })
  public createdAt!: Date;

  @Column({ nullable: true })
  public updatedAt!: Date;

  @Column()
  public userId!: string;

  @Column()
  public groupId!: string;

  @ManyToOne(() => User, user => user.messages)
  public user: User;

  @ManyToOne(() => Group, group => group.messages)
  public group: Group;
}
