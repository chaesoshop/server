import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [EmailModule,TypeOrmModule.forFeature([UserEntity]),AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }