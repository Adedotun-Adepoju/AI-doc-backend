import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createAccountDto } from './dto/create-account.dto';
import { requestPasswordResetDto } from './dto/request-password-reset.dto';
import { resetPasswordDto } from './dto/reset-password.dto';

@Controller('authorization')
export class AuthorizationController {

  @Post('/sign-up')
  async signUp(@Body() createAccountDto: createAccountDto): Promise<object> {
    return await {}
  }

  @Get('/verify-email')
  async verifyEmail(@Param('id') id:string): Promise<object> {
    return await {}
  }

  @Post('/password/request-reset')
  async snedResetLink(@Body() passwordResetDto: requestPasswordResetDto): Promise<object> {
    return await {}
  }  

  @Post('/password/reset')
  async resetPassword(@Body() passwordResetDto: resetPasswordDto): Promise<object> {
    return await {}
  }  
}
