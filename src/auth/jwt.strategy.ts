import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from '@user/dto/user.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRETKEY,
    });
    console.log("JwtStrategy JWT_SECRETKEY====",process.env.JWT_SECRETKEY);
  }
  
// this will executed after token is validated and accepted
// The return from the validate() method is injected into the request object of any operation 
// that's guarded with JWT authentication.
// like new todo post API
  
  async validate(payload: JwtPayload): Promise<UserDto> {
    
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

/* 
What actually happens is that the JWT Strategy extracts the token and validates it. 

 If the token is invalid, the current Request is stopped and 401 Unauthorized response
  is returned to the user. Otherwise, the validate() 
  function is called passing it to the JWT token, 
  to allow your application to check whether the user exists 
  in the database (maybe also check that the user isn't locked, etc.).

  The validate() function should throw an Unauthorized exception if the user isn't valid. 
  Otherwise, it should return the user back to the PassportModule.
*/