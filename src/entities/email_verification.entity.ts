import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";

import { User } from "./user.entity";

export enum VerificationStatus {
  VERIFIED = "verified",
  NOT_VERIFIED = "not_verified"
}
@Entity()
export class EmailVerification {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public email: string

  @Column({
    type: "enum",
    enum: VerificationStatus,
  })
  public status: string

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