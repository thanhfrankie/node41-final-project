import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoiDungModule } from './nguoi_dung/nguoi_dung.module';
import { ConfigModule } from '@nestjs/config';
import { BinhLuanModule } from './binh_luan/binh_luan.module';
import { PhongModule } from './phong/phong.module';
import { DatPhongModule } from './dat_phong/dat_phong.module';
import { ViTriModule } from './vi_tri/vi_tri.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,NguoiDungModule,ConfigModule.forRoot({ isGlobal: true }), BinhLuanModule, PhongModule, DatPhongModule, ViTriModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy,PrismaService, JwtService],
})
export class AppModule {}
