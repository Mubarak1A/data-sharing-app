import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Validate user with Firebase
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.uid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
