import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserData } from '../database/entities/user-data.entity';
import { Image } from '../database/entities/image.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserData, Image]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtService],
  exports: [UserService],
})
export class UserModule {}
