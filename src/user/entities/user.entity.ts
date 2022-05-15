import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public username!: string;
}
