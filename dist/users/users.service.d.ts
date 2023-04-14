import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersService {
    private emailService;
    private usersRepository;
    private dataSource;
    private authService;
    constructor(emailService: EmailService, usersRepository: Repository<UserEntity>, dataSource: DataSource, authService: AuthService);
    createUser(name: string, email: string, password: string): Promise<void>;
    private checkUserExists;
    saveUser(name: string, email: string, password: string, signupVerifyToken: string): Promise<void>;
    saveUserUsingQueryRunner(name: string, email: string, password: string, signupVerifyToken: string): Promise<void>;
    private saveUserUsingTransaction;
    sendMemberJoinEmail(email: string, signupVerifyToken: string): Promise<void>;
    verifyEmail(signupVerifyToken: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    getUserInfo(userId: string): Promise<UserInfo>;
}
