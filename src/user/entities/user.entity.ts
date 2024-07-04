import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserData } from '../../database/entities/user-data.entity';
import { Image } from '../../database/entities/image.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserData, userData => userData.user)
  userData: UserData[];

  @OneToMany(() => Image, image => image.user)
  images: Image[];
}
