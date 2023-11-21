import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public first_name: string

  @Column()
  public last_name: string

  @Column()
  public email: string 

  @Column({
    type: "text"
  })
  public password: string
}