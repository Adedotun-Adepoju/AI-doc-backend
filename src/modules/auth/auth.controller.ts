import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, HttpException, UseGuards, Request } from '@nestjs/common';
import { createAccountDto } from './dto/create-account.dto';
import { requestPasswordResetDto } from './dto/request-password-reset.dto';
import { resetPasswordDto } from './dto/reset-password.dto';
import { loginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ResponseDto, ResponseHelper } from 'src/helper/response.helper';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

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
      console.log(error)
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/verify-email/:id')
  async verifyEmail(@Param('id') id:string): Promise<object> {
    return await this.authService.verifyEmail(id)
  }

  @Post('/password/request-reset')
  async snedResetLink(@Body() passwordResetDto: requestPasswordResetDto): Promise<object> {
    return await {};
  }  

  @Post('/password/reset')
  async resetPassword(@Body() passwordResetDto: resetPasswordDto): Promise<object> {
    return await {}
  }  

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req) {
    try {
      const data = await this.authService.login(req.user)
      return ResponseHelper.successResponse('Login successful', data);
    }catch (error){
      throw new HttpException(error.message, error.status);
    }

  }
}
