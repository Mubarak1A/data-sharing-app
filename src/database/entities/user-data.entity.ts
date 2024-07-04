import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  numberOfUsers: number;

  @Column()
  numberOfProducts: number;

  @Column()
  percentage: number;

  @ManyToOne(() => User, user => user.userData)
  user: User;
}
