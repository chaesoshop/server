import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }