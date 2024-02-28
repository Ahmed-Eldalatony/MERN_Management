import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthorizeGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    const allowedRoles = this.reflector.get('allowedRoles', context.getHandler())
    const reqeuest = context.switchToHttp().getRequest()
    const result = reqeuest?.currentUser?.roles
      .map((role: string) => allowedRoles.includes(role))
      .find((val: boolean) => val === true)
    if (result) return true
    throw new UnauthorizedException('Sorry you are not authorized')

  }
}

