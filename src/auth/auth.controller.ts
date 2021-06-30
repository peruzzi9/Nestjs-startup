import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '@user/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    ); 

    return result;
  }
  
  @HttpCode(200) 
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto
  ,@Res({ passthrough: true }) res: Response): Promise<LoginStatus> {
     
    const result =await this.authService.login(loginUserDto);
    
    if (result.code == 200)
    {
      const secretData = {
        accessToken : result.accessToken,
        refreshToken : result.refreshToken,
      };
   
      res.cookie('auth-cookie', secretData, { httpOnly: true/* ,secure:true */});
      
    
     // tokens will be set at header and not returned inside response
     delete result['tokensCookies'] 
    }
    
    return result
  }
  

  @Get('whoami')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Get('refresh')
  refresh(@Req() request: any,@Res({ passthrough: true }) res: Response) {
    const accessToken = this.authService.getJwtAccessToken(request.user.id);
    const refreshToken = this.authService.getJwtRefreshToken(request.user.id);
    const secretData = {
      accessToken : accessToken,
      refreshToken : refreshToken,
    };
 
    res.cookie('auth-cookie', secretData, { httpOnly: true/* ,secure:true */ });

    return {code:200 , message:"User Token is refreshed"};
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: any,@Res({ passthrough: true }) res: Response) {
    // remove refresh token from database
    await this.usersService.removeRefreshToken(request.user.id);
    const secretData = {
      accessToken : '',
      refreshToken : '',
    };
 
    res.cookie('auth-cookie', secretData, { httpOnly: true/* ,secure:true */ }); 

  return {code:200 , message:"User is logged out"}
  }
}
