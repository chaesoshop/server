import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entity/user.entity';
import authConfig from './config/authConfig';


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig,authConfig],
      isGlobal: true,
      validationSchema,
    }),
     TypeOrmModule.forRoot({
       type: "mysql",
       host: process.env.DATABASE_HOST,  
       port: 3306,
       username: process.env.DATABASE_USERNAME, 
       password: process.env.DATABASE_PASSWORD, 
       database : "chaesoDB",
       entities: [UserEntity],           ///__dirname + '/**/*.entity{.ts,.js}'
       synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
       migrations: [__dirname + '/**/migrations/*.js'],
       migrationsTableName: 'migrations',
     }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }