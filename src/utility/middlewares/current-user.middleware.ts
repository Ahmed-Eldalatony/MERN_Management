import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { clearConfigCache } from 'prettier';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userSevice: UserService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
      req.currentUser = null
      next()
      return
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const currentUser = await this.userSevice.findOne(+id)
        req.currentUser = currentUser
        next();
      } catch (err) {
        req.currentUser = null
        next()
      }

    }
  }

}
interface JwtPayload {
  id: string;
}

