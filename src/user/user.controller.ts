// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user.entity';
import { CreateUserDataDto } from '../database/dto/create-user-data.dto';
import { UploadImageDto } from './dto/upload-image.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.UserA)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id/data')
  @Roles(UserRole.UserB)
  async getData(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.getUserData(userId);
  }

  @Post(':id/data')
  @Roles(UserRole.UserA)
  async createData(@Param('id') id: string, @Body() createUserDataDto: CreateUserDataDto) {
    const userId = parseInt(id, 10);
    return this.userService.createUserData(userId, createUserDataDto);
  }

  @Post(':id/images')
  @Roles(UserRole.UserB)
  async uploadImage(@Param('id') id: string, @Body() uploadImageDto: UploadImageDto) {
    const userId = parseInt(id, 10);
    return this.userService.uploadImage(userId, uploadImageDto);
  }

  @Get(':id/images')
  @Roles(UserRole.UserA)
  async getImages(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.getUserImages(userId);
  }
}
