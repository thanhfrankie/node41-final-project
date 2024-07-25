import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) { }
  private validatePassword(password: string): void {
    if (password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long(>=6)',
      );
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      throw new BadRequestException(
        'Password must contain both uppercase and lowercase letters(A-a)',
      );
    }

    if (!/\d/.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one digit (0-9)',
      );
    }

    if (!/[!@#$%^&*()]/.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one special character (!@#$%^&*())',
      );
    }
  }
  async signIn(model: { email: string; password: string }) {
    const { email, password } = model;
    const user = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });
    if (!user) {
      throw new HttpException('Email không tồn tại', HttpStatus.FORBIDDEN);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = { userId: user.id, email: user.email };
      const token = this.jwtService.sign(payload, {
        expiresIn: '90d',
        algorithm: 'HS256',
        secret: this.configService.get<string>('SECRET_KEY'),
      });

      return {
        token,
        
        email: user.email,
      };
    } else {
      throw new HttpException(
        'Sai mật khẩu hoặc email không đúng',
        HttpStatus.FORBIDDEN,
      );
    }
  }
  async signUp(model: { email: string; password: string; name: string; phone:string }) {
    const { email, name, phone, password } = model;
    if (!email || !name || !phone || !password) {
      throw new BadRequestException('Missing required fields');
    }
    this.validatePassword(password);

    const existingEmail = await this.prisma.nguoi_dung.findFirst({
      where: {email}
    })
    if (existingEmail) {
      throw new ConflictException('Email already exists');
      
    }
    const existingPhone =await this.prisma.nguoi_dung.findFirst({
      where: {phone}
    })
    if (existingPhone) {
      throw new ConflictException('Phone number already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = await this.prisma.nguoi_dung.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'USER',
      },
    });
    return newUser;
  }

}
