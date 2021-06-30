import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '@user/entity/user.entity';
import { toUserDto } from '@shared/mapper';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { comparePasswords } from '@shared/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
     // throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
     return {error: 'User not found' };
    }

    
    // compare passwords
    const areEqual = await comparePasswords(user.password, password);
    console.log("Password =====",user.password, password, areEqual)
    if (!areEqual) {
     // throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
     return {error: 'Invalid credentials'};
    }

    return {user : toUserDto(user)};
  }

  async findByPayload({ id }: any): Promise<UserDto> {
    console.log("findByPayload===",id)
    return await this.findOne({ where: { id } });
  }

  async create(userDto: CreateUserDto): Promise<any> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({ where: { email } });
    if (userInDb) {
     // throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
     return {error:'User already exists'}
    }

    const user: UserEntity = await this.userRepo.create({
      username,
      password,
      email,
    });

    await this.userRepo.save(user);

    return {user:toUserDto(user)};
  }

  private _sanitizeUser(user: UserEntity) {
    delete user.password;
    return user;
  }

  //  saving the hash of the current refresh token in database.
  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(userId, {
      currentHashedRefreshToken
    });
  }
//removes the refresh token from the database.
  async removeRefreshToken(userId: string) {
    console.log("User with userId=",userId," is logged out ....")
    return this.userRepo.update(userId, {
      currentHashedRefreshToken: null
    });
  }

}
