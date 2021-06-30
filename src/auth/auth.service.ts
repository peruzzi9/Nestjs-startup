import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '@user/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { UsersService } from '@user/users.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user-login.dto'; 
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      code: 200,
      message: 'user registered',
    };

    
    const result=  await this.usersService.create(userDto);
    if (result.error)   
    status = {
        code: 400,
        error: result.error,
       }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const result = await this.usersService.findByLogin(loginUserDto);

    // if user not exist or wrong password then response will be sent from inside usersService.findByLogin
    console.log("response === ",result)
    if (!result.error)
    {
      const accessToken = this.getJwtAccessToken(result.user.id);
      const refreshToken = this.getJwtRefreshToken(result.user.id); 

    console.log("*********************************************")   
    console.log("accessToken===",accessToken) 
    console.log("*********************************************") 
    console.log("refreshToken===",refreshToken)
    console.log("*********************************************") 
      await this.usersService.setCurrentRefreshToken(refreshToken, result.user.id); 
     return {
      code:200,
      email: result.user.email,
      accessToken : accessToken,
      refreshToken : refreshToken
    };
    }
    
    return {code:400,...result};
   
  }

  /* 
   Remember that from above, getUserIfRefreshTokenMatches function is called by the JwtStrategy.validate() function
   once a token is validated by Passport.js middleware.
  */
  // checking if the token from cookies matches the one in the database
async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
  console.log("getUserIfRefreshTokenMatches====",userId,refreshToken)
  const user = await this.usersService.findByPayload({id:userId});

  console.log("getUserIfRefreshTokenMatches user====",user)
  const isRefreshTokenMatching = await bcrypt.compare(
    refreshToken,
    user.currentHashedRefreshToken
  );

  console.log("isRefreshTokenMatching====",isRefreshTokenMatching)
  if (isRefreshTokenMatching) {
    delete user['currentHashedRefreshToken'] ; // remove currentHashedRefreshToken from response for security
    return user;
  }
  else
  throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
}
 
  
  public getJwtAccessToken(userId: string) {
  console.log("getCookieWithJwtAccessToken===",{
    secret: process.env.JWT_SECRETKEY,
    expiresIn: `${process.env.JWT_EXPIRESIN}`
  })  
  const payload: JwtPayload = { id:userId,createDate:new Date().toString()};
  const token = this.jwtService.sign(payload, {
    secret: process.env.JWT_SECRETKEY,
    expiresIn: `${process.env.JWT_EXPIRESIN}`
  }); 
  return token
}

public getJwtRefreshToken(userId: string) {
  console.log("getCookieWithJwtRefreshToken===",{
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRESIN}`
  }) 
  const payload: JwtPayload = { id:userId,createDate: new Date().toString() };
  const token = this.jwtService.sign(payload, {
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRESIN}`
  });
  //const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRESIN}`;
  return  token
}


}

