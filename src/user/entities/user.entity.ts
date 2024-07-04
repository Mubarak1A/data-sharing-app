import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserData } from '../../database/entities/user-data.entity';
import { Image } from '../../database/entities/image.entity';

export enum UserRole {
  UserA = 'UserA',
  UserB = 'UserB',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.UserA,
  })
  role: UserRole;

  @OneToMany(() => UserData, userData => userData.user)
  userData: UserData[];

  @OneToMany(() => Image, image => image.user)
  images: Image[];
}
