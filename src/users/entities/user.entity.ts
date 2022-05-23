import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
