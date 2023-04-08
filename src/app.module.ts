import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entity/user.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
     TypeOrmModule.forRoot({
       type: "mysql",
       host: process.env.DATABASE_HOST, // 'localhost',
       port: 3306,
       username: process.env.DATABASE_USERNAME, // 'root',
       password: process.env.DATABASE_PASSWORD, // 'test',
       database: 'test',
       entities: [__dirname + '/**/*.entity{.ts,.js}'],
       synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
     }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }