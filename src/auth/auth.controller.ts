import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
class loginType {

  @ApiProperty()
  // IsEmail()
  email: string

  @ApiProperty()
  password: string
}
class signUpType {

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @ApiProperty()
  phone: string
}


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() body:loginType, @Headers('token') header) {
    try {
      return this.authService.signIn(body);
    } catch (exception) {
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status);

      //500
      throw new HttpException('Lỗi ...', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('/sign-up')
  signUp(@Body() body:signUpType) {
    return this.authService.signUp(body);
  }
}
