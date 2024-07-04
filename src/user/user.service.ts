import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserData } from '../database/entities/user-data.entity';
import { Image } from '../database/entities/image.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserData) private userDataRepository: Repository<UserData>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
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

  async createUserData(userId: number, userData: Partial<UserData>): Promise<UserData> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const newUserData = this.userDataRepository.create({ ...userData, user });
    return this.userDataRepository.save(newUserData);
  }

  async uploadImage(userId: number, imageUrl: string): Promise<Image> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const newImage = this.imageRepository.create({ imageUrl, user });
    return this.imageRepository.save(newImage);
  }

  async getUserImages(userId: number): Promise<Image[]> {
    return this.imageRepository.find({ where: { user: { id: userId } } });
  }
}
