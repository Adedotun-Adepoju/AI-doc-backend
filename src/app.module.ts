import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [
    AuthModule, 
    ChatModule, 
    PatientsModule, 
    DoctorsModule,  
    MailerModule,   
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
  ],
  controllers: [AppController,],
  providers: [AppService, ],
})
export class AppModule {}
