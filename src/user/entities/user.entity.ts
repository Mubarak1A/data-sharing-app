import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  UserA = 'UserA',
  UserB = 'UserB',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.UserA,
  })
  role: UserRole;
}
