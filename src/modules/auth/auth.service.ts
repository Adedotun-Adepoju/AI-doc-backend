import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { MailerService } from '../mailer/mailer.service';
import { EmailVerification } from 'src/entities/email_verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationStatus } from 'src/entities/email_verification.entity';

@Injectable()
export class AuthService {
  constructor(
      private usersService:UsersService,
      private jwtService: JwtService,
      private mailerService: MailerService,

      @InjectRepository(EmailVerification)
      private emailVerificationRepo: Repository<EmailVerification>
  ){}

  async login(user: any): Promise<any> {
    const payload = {
      sub: user.id,
      username: user.email
    }

    return {
      user,
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, pass:string): Promise<Partial<User>> {
    const user = await this.usersService.findUser(email)

    if(!user) {
      return null 
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password)

    if(user && isPasswordValid){
      const { password, ...result } = user;
      return result;
    }
  }

  async signUp(payload): Promise<Partial<User>>{
    const hashedPassword = await bcrypt.hash(payload.password, 10)
    const newUser = await this.usersService.createUser(
      payload.first_name,
      payload.last_name,
      payload.email, 
      hashedPassword
    )

    // Todo: Create email verification record
    const verification = this.emailVerificationRepo.create({
      email: payload.email,
      status: VerificationStatus.NOT_VERIFIED,
      user: newUser
    })

    await this.emailVerificationRepo.save(verification)
    // Send email verification
    const url = process.env.BASE_URL
    const verificationId = verification.id 

    const emailContent = await this.generateWelcomeEmail(newUser.first_name, newUser.last_name, url, verificationId)
    this.mailerService.sendMail(payload.email, "Verify Email Address for AI-Doc", emailContent)

    return newUser
  }

  async verifyEmail(verificationId: string){
    const verification = await this.emailVerificationRepo.findOneBy({ id: verificationId })

    if(!verification){
      return {
        status: "error",
        message: "verification does not exist"
      }
    }

    const user = await this.usersService.findUser(verification.email)

    verification.status = VerificationStatus.VERIFIED
    await this.emailVerificationRepo.save(verification)

    const emailContent = await this.generateSuccessfulVerificationEmail()
    this.mailerService.sendMail(user.email, "Verification successful", emailContent)

    return {
      status: "success",
      message: "Email verified successfully",
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        app_url: process.env.APP_URL
      }
    }
  }

  async generateWelcomeEmail(firstName:string, lastName: string, url:string, verificationId: string) {
    const emailContent = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .btn-container {
            text-align: center;
            margin: 35px 0;
          }
          a.btn {
            text-decoration: none;
            background-color: #007bff;
            color: #fff;
            font-size: 15px;
            line-height: 18px;
            font-weight: 600;
            padding: 10px;
            border-radius: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://www.revechat.com/wp-content/uploads/2021/11/chatbots-for-healthcare-1.png" alt="Company Logo" style="margin-bottom: 20px;">
      
          <h1 style="color: #007bff;">Welcome to AI Doc</h1>
      
          <p>Hello ${firstName} ${lastName},</p>
      
          <p>Thank you for choosing AI-Doc as your personal healthcare assistant. We look forward to working alongside you but before we get started, we need to confirm that this is you</p>
          
          <p>Please click the button below to verify your email.</p>

          <div class="btn-container" style="margin-top: 18px">
            <a href="${url}/auth/verify-email/${verificationId}" class="btn">Verify Email</a>
          </div>

          <p>Best regards,<br>AI-doc</p>
      
          <p style="font-size: 12px; color: #777;">This is a system generated message. Do not reply.</p>
        </div>
      </body>
      </html>
  `;

  return emailContent;
  }

  async generateSuccessfulVerificationEmail(){
    const appUrl = process.env.APP_URL

    const emailContent = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .btn-container {
            text-align: center;
            margin: 35px 0;
          }
          a.btn {
            text-decoration: none;
            background-color: #007bff;
            color: #fff;
            font-size: 15px;
            line-height: 18px;
            font-weight: 600;
            padding: 10px;
            border-radius: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://www.revechat.com/wp-content/uploads/2021/11/chatbots-for-healthcare-1.png" alt="Company Logo" style="margin-bottom: 20px;">
      
          <h1 style="color: #007bff;">Welcome to AI Doc</h1>
      
          <p class="text">Thank you for choosing AI-Doc! The <a href="${appUrl}">Ai-Doc portal</a> is where you can login to access healthcare assistance from AI-Doc.
      
          <p>Thank you for choosing AI-Doc as your personal healthcare assistant. We look forward to working with you</p>

          <p>Best regards,<br>AI-doc</p>
      
          <p style="font-size: 12px; color: #777;">This is a system generated message. Do not reply.</p>
        </div>
      </body>
      </html>
  `;

  return emailContent
  }
}
