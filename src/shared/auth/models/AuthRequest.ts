import { Request } from 'express';
import { User } from '../../../core/domain/users/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
