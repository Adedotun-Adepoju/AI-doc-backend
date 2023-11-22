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

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(email);

    if(!user){
      throw new UnauthorizedException()
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password)

    if(!isPasswordValid) {
      console.log("Wrong")
      throw new UnauthorizedException()
    }

    // TODO: Generate a JWT and return it here instead of the user object
    const payload = {
      sub: user.id,
      email: user.email
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
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
