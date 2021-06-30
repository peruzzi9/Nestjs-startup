import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, HttpException, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from '@user/dto/user.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt-refresh-token') {
  constructor(private readonly authService: AuthService, 
              private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        //console.log("request===",request)
        
        const data = request?.cookies["auth-cookie"];
        
        console.log("JwtStrategy validate Token====",data)
                if(!data){
                    return null;
                }
                // note : decoded accesstoken is same as finale payload passed to validate()
                console.log("JwtStrategy accessToken decoded=====",this.jwtService.decode(data.accessToken))
                const decodedToken:any=this.jwtService.decode(data.accessToken);
                const expireDate=decodedToken.exp;
                console.log("JwtStrategy accessToken will expire at=====",new Date(expireDate*1000))
                return data.accessToken
                // here return accessToken to be checked and verified 
                // we can replace with refresh token if we want validate refresh token not access token but we should make changes on jwtModule.register
      }]), 
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRETKEY, // accesstoken secretKey
      /* 
      The 'ignoreExpiration' property accepts a boolean value, if the value is true 
      then 'JwtStrategy' ignores to check token expiration on validation,
       if the value is false then 'JwtStrategy' will check for the expiration date. 
      */
    });
    console.log("JwtStrategy JWT_REFRESH_TOKEN_SECRET====",process.env.JWT_REFRESH_TOKEN_SECRET);
  }
  
// this will executed after token is validated and accepted
// The return from the validate() method is injected into the request object of any operation 
// that's guarded with JWT authentication.
// like new todo post API
  
  async validate(request: Request,payload: JwtPayload): Promise<UserDto> {
    console.log("JwtStrategy validate====",payload);
    if(!payload){
      throw new BadRequestException('invalid jwt token');
  }
  const data = request?.cookies["auth-cookie"];
  if(!data?.refreshToken){
      throw new BadRequestException('invalid refresh token');
  }
    const refreshToken = data.refreshToken;
    // here we replace validate() with getUserIfRefreshTokenMatches
    // now we check in database user and refresh token existing and matches
    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
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