import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn } from "typeorm";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  public id: string

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
}