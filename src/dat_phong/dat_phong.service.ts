import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatPhongDto } from './dto/create-dat_phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat_phong.dto';
import { ConfigService } from '@nestjs/config';
import { dat_phong, PrismaClient } from '@prisma/client';

@Injectable()
export class DatPhongService {
  constructor(private configService: ConfigService) {
    
  }
  prisma = new PrismaClient();
  async create(model: any): Promise<dat_phong> {
    const { id, maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = model
    const newBookingRoom = await this.prisma.dat_phong.create({
      data: {
        id, maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung
      }
    })
    return newBookingRoom
  }

  async findAll(): Promise<dat_phong[]>  {
    let data: dat_phong[] = await this.prisma.dat_phong.findMany();
    return data;
  }

  async findOne(id: number) {
    let data = await this.prisma.dat_phong.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Room not found');
    }
    return data;
  }

  async update(id: number, model: any): Promise<dat_phong> {
    let existingBookingRoom = await this.prisma.dat_phong.findUnique({
      where: { id },
    });
    if (!existingBookingRoom) {
      throw new NotFoundException('Room not found');
    }
    const updateBookingRoom = await this.prisma.dat_phong.update({
      where: { id },
      data: model,
    });
    return updateBookingRoom;
  }

  async remove(id: number) {
    let existingBookingRoom= await this.prisma.dat_phong.findUnique({
      where:{id}
   });
   if (!existingBookingRoom) {
    throw new NotFoundException('Room not found');
    }
    await this.prisma.dat_phong.delete({
      where: { id },
    });
    return 'Room deleted successfully';
  }
}
