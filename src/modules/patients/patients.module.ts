import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Module({
  providers: [PatientsService]
})
export class PatientsModule {}
