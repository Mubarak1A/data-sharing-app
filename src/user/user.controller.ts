import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserData } from '../database/entities/user-data.entity';
import { Image } from '../database/entities/image.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id/data')
  getUserData(@Param('id') userId: number): Promise<UserData[]> {
    return this.userService.getUserData(userId);
  }

  @Post(':id/data')
  createUserData(@Param('id') userId: number, @Body() userData: Partial<UserData>) {
    return this.userService.createUserData(userId, userData);
  }

  @Post(':id/images')
  uploadImage(@Param('id') userId: number, @Body('imageUrl') imageUrl: string): Promise<Image> {
    return this.userService.uploadImage(userId, imageUrl);
  }

  @Get(':id/images')
  getUserImages(@Param('id') userId: number): Promise<Image[]> {
    return this.userService.getUserImages(userId);
  }
}
