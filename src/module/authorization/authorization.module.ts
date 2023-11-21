import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { User } from '../../entities/user.entity';
import { Patient } from '../../entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Patient])],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
