import {
  Injectable, 
  NestMiddleware,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(@Req() req, @Res() _res, next: () => void) {
    const { user } = req.session;
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    next();
  }
}
