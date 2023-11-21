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

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id"})
  user: User
}