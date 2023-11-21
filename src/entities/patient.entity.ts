import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, 
  OneToOne,
  JoinColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public user_id: string 

  @Column({
    type: "int"
  })
  public contact_number: number 

  @Column({
    type: "int"
  })
  public conversation_number: number

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id"})
  user: User
}