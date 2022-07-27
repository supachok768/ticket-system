import { Request } from 'express';
import { User } from '@prisma/client';

export interface DataStoredInToken {
  _sub: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
