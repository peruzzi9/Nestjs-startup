import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt-refresh-token',// when we have many strategy we define default one 
                             //to be used with guard without strategy name
      property: 'user',
      session: false,//by default, disables storing any authentication information in the Server Session
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
        /* 
        expiresIn: expressed in seconds or a string describing a time span vercel/ms.
        Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
        If you use a string be sure you provide the time units (days, hours, etc),
        otherwise milliseconds unit is used by default ("120" is equal to "120ms").
        */
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {
  constructor(){
    console.log("JWT_SECRETKEY===",process.env.JWT_SECRETKEY)
    console.log("JWT_EXPIRESIN===",process.env.JWT_EXPIRESIN)
  }
}
