import { Injectable,NotFoundException,UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ulid } from 'ulid';
import { DataSource,Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(private emailService: EmailService,
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private dataSource: DataSource,){}

    async createUser(name: string, email: string, password: string) {
        const userExist = await this.checkUserExists(email);
        if (userExist) {
            throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.'); 
        }
        const signupVerifyToken = uuid.v1();
        await this.saveUserUsingTransaction(name, email, password, signupVerifyToken);
    }

    private async checkUserExists(emailAddress: string): Promise<boolean> {
        const user = await this.usersRepository.findOne({ 
            where : {email: emailAddress }});
        return user !== null;
    }

    private async saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
        const user = new UserEntity();
        user.id = ulid();
        user.name = name;
        user.email = email;
        user.password = password;
        user.signupVerifyToken = signupVerifyToken;
        await this.usersRepository.save(user);
      }

      private async saveUserUsingQueryRunner(name: string, email: string, password: string, signupVerifyToken: string) {
        const queryRunner = this.dataSource.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
          const user = new UserEntity();
          user.id = ulid();
          user.name = name;
          user.email = email;
          user.password = password;
          user.signupVerifyToken = signupVerifyToken;
    
          await queryRunner.manager.save(user);
    
          // throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다
    
          await queryRunner.commitTransaction();
        } catch (e) {
          // 에러가 발생하면 롤백
          await queryRunner.rollbackTransaction();
        } finally {
          // 직접 생성한 QueryRunner는 해제시켜 주어야 함
          await queryRunner.release();
        }
      }

      private async saveUserUsingTransaction(name: string, email: string, password: string, signupVerifyToken: string) {
        await this.dataSource.transaction(async manager => {
          const user = new UserEntity();
          user.id = ulid();
          user.name = name;
          user.email = email;
          user.password = password;
          user.signupVerifyToken = signupVerifyToken;
    
          await manager.save(user);
    
          // throw new InternalServerErrorException();
        })
      }
    
    private async sendMemberJoinEmail(email: string, signupVerifyToken: string){
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

    async verifyEmail(signupVerifyToken:string): Promise<string>{
        throw new Error('Method not implemented');
    }

    async login(email: string, pasword:string): Promise<string>{
        throw new Error('Method not implemented');
    }

    async getUserInfo(userId:string): Promise<UserInfo>{
        throw new Error('Method not implemented');
    }
}

