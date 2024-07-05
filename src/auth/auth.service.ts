import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const userRecord = await this.firebaseAdmin.auth().getUserByEmail(email);
      const user = await this.userService.findByEmail(email);
      if (user && user.password === password) {
        return user;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    await this.firebaseAdmin.auth().createUser({
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return this.userService.createUser(createUserDto);
  }
}
