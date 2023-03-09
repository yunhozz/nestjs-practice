import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../config/custom-repository.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

/*
<암호화 (encoding)>
1. 암호화 키 (Encryption Key)와 함께 암호화 (양방향): 암호화 키가 노출되면 알고리즘은 대부분 오픈되어 있기 때문에 위험도 높음
2. SHA256 등 Hash 로 암호화해서 저장 (단방향): 비슷한 암호일 경우 레인보우 테이블을 만들어서 암호화된 비밀번호를 비교해서 알아낼 수 있음
3. 솔트(salt) + 비밀번호(plain password)를 Hash 로 암호화해서 저장: 가장 안전한 방식
 */
