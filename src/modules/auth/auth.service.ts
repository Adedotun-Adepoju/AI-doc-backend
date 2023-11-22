import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
      private usersService:UsersService,
      private jwtService: JwtService,
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
      return result
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

    return newUser
  }
}
