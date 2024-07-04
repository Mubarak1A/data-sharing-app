import { UserRole } from '../../user/entities/user.entity';

export class RegisterDto {
  email: string;
  password: string;
  role: UserRole;
}
