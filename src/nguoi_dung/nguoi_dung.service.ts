import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi_dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi_dung.dto';
import { nguoi_dung, PrismaClient } from '@prisma/client';
import { NguoiDungType } from './entities/nguoi_dung.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class NguoiDungService {
  constructor(private configService: ConfigService) {}
  prisma = new PrismaClient();
  async create(model: any): Promise<nguoi_dung> {
    const { email, name, phone, password } = model;
    if (!email || !name || !phone || !password) {
      throw new BadRequestException('Missing required fields');
    }
    this.validatePassword(password);

    const existingEmail = await this.prisma.nguoi_dung.findFirst({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
    const existingPhone = await this.prisma.nguoi_dung.findFirst({
      where: { phone },
    });
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
  async findAll(): Promise<nguoi_dung[]> {
    let data: nguoi_dung[] = await this.prisma.nguoi_dung.findMany();
    return data;
  }

  async findOne(id: number): Promise<nguoi_dung> {
    let data = await this.prisma.nguoi_dung.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  async update(id: number, model: any): Promise<nguoi_dung> {
    let existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (model.password) {
      this.validatePassword(model.password);
      model.password = await bcrypt.hash(model.password, 15);
    }
    const updateUser = await this.prisma.nguoi_dung.update({
      where: { id },
      data: model,
    });
    return updateUser;
  }

  async remove(id: number) {
    let existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.nguoi_dung.delete({
      where: { id },
    });
    return 'User deleted successfully';
  }
  async uploadAvatar(file: Express.Multer.File, userId: number): Promise<any> {
    if (!file) {
      throw new BadRequestException('File not provided');
    }
    let existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const fileUploadPromises = await this.prisma.nguoi_dung.update({
      where: { id: userId },
      data: {
        avatar: `/public/img/${file.filename}`,
      },
    });

    return {
      message: 'Avatar uploaded successfully',
      file: fileUploadPromises,
    };
  }

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
}
