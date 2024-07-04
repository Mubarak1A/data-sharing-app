import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDataDto } from '../database/dto/create-user-data.dto';
import { UserData } from '../database/entities/user-data.entity';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from '../database/entities/image.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserData)
    private userDataRepository: Repository<UserData>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getUserData(userId: number): Promise<UserData[]> {
    return this.userDataRepository.find({ where: { user: { id: userId } } });
  }

  async createUserData(userId: number, createUserDataDto: CreateUserDataDto): Promise<UserData> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const userData = this.userDataRepository.create({ ...createUserDataDto, user });
    return this.userDataRepository.save(userData);
  }

  async uploadImage(userId: number, uploadImageDto: UploadImageDto): Promise<Image> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const image = this.imageRepository.create({ ...uploadImageDto, user });
    return this.imageRepository.save(image);
  }

  async getUserImages(userId: number): Promise<Image[]> {
    return this.imageRepository.find({ where: { user: { id: userId } } });
  }
}
