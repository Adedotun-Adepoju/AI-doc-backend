import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { ChatModule } from './module/chat/chat.module';
import { PatientsModule } from './module/patients/patients.module';
import { DoctorsModule } from './module/doctors/doctors.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

@Module({
  imports: [
    AuthModule, 
    ChatModule, 
    PatientsModule, 
    DoctorsModule,     
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    })
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
