import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [EmailModule,TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }