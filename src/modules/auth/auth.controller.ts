import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, HttpException } from '@nestjs/common';
import { createAccountDto } from './dto/create-account.dto';
import { requestPasswordResetDto } from './dto/request-password-reset.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ResponseDto, ResponseHelper } from 'src/helper/response.helper';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  @Post('/sign-up')
  
  async signUp(@Body() createAccountDto: createAccountDto): Promise<ResponseDto> {
    try {
      const user = await this.authService.signUp(createAccountDto)
      return ResponseHelper.successResponse('User created successfully', user);
    } catch(error){
      throw new HttpException(error.message, error.status);
    }

  }

  @Get('/verify-email')
  async verifyEmail(@Param('id') id:string): Promise<object> {
    console.log("here")
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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: loginDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password)
  }
}
