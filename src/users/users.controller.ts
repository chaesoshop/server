import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { EmailService } from 'src/email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { Headers } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Controller('users')
export class UsersController{
    constructor(
      private usersService: UsersService,
      private authService: AuthService) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
      const { name, email, password } = dto;
      await this.usersService.createUser(name, email, password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
      const { signupVerifyToken } = dto;
  
      return await this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
      const { email, password } = dto;
  
      return await this.usersService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserInfo(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
      return this.usersService.getUserInfo(userId);
    }
}
