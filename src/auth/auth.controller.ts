import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/me')
  @UseGuards(AuthGuard())
  getMyInfoByToken(@GetUser() user: User) {
    console.log('user', user);
  }
}

/*
<nestjs 의 여러 미들웨어>
1. Pipes: 요청 유효성 검사 및 페이로드 변환을 위해 만들어짐, 데이터를 예상한 대로 직렬화
2. Filters: 오류 처리 미들웨어, 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복잡성을 관리하는 방법을 알 수 있음
3. Guards: 인증 미들웨어, 지정된 경로로 통과할 수 있는 사람과 허용되지 않는 사람을 서버에 알려줌
4. Interceptors: 전후 미들웨어, 응답 매핑 및 캐시 관리와 함께 요청 로깅

<각 미들웨어가 호출되는 순서>
middleware -> guard -> interceptor(before) -> pipe -> controller -> service
-> controller -> interceptor(after) -> filter(if applicable) -> client
 */
