// src/mailer/mailer.service.ts

import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail email address
      pass: process.env.EMAIL_PASSWORD, // your Gmail email password or App Password
    },
    authMethod: 'PLAIN'
  });

  async sendMail(to: string, subject: string, html): Promise<void> {
    await this.transporter.sendMail({
      from: `noreply@${process.env.EMAIL_DOMAIN}`, // your Gmail email address
      to,
      subject,
      html,
    });
  }
}