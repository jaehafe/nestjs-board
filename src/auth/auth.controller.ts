import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    type: AuthCredentialsDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
    type: AuthCredentialsDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @UseGuards 컨트롤러 또는 핸들러 메서드에 가드를 적용하는 데코레이터입니다. 인증, 권한 부여, 요청 유효성 검사 등의 기능을 적용할 수 있습니다.
  // AuthGuard
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    // console.log('AuthGuard()', AuthGuard);
    // console.log('req=', req);
  }
}
