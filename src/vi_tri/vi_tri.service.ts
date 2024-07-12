import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViTriDto } from './dto/create-vi_tri.dto';
import { UpdateViTriDto } from './dto/update-vi_tri.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, vi_tri } from '@prisma/client';

@Injectable()
export class ViTriService {
  constructor(private configService: ConfigService) {
    
  }
  prisma = new PrismaClient();
 async  create(model: any): Promise<vi_tri> {
   const { id, tenViTri, tinhThanh, quocGia, hinhAnh } = model
   const newLocation = await this.prisma.vi_tri.create({
     data: {id, tenViTri, tinhThanh, quocGia, hinhAnh }
   })
   return newLocation
  }

 async  findAll(): Promise<vi_tri[]> {
  let data: vi_tri[] = await this.prisma.vi_tri.findMany();
  return data;
  }

async   findOne(id: number) {
  let data = await this.prisma.vi_tri.findUnique({
    where: { id },
  });
  if (!data) {
    throw new NotFoundException('Location not found');
  }
  return data;
  }

  async update(id: number, model: any): Promise<vi_tri> {
    let existingLocation = await this.prisma.vi_tri.findUnique({
      where: { id },
    });
    if (!existingLocation) {
      throw new NotFoundException('Location not found');
    }
    const updateLocation = await this.prisma.vi_tri.update({
      where: { id },
      data: model,
    });
    return updateLocation;
  }

 async  remove(id: number) {
  let existingLocation= await this.prisma.vi_tri.findUnique({
    where:{id}
 });
 if (!existingLocation) {
  throw new NotFoundException('Location not found');
  }
  await this.prisma.vi_tri.delete({
    where: { id },
  });
  return 'Location deleted successfully';
  }
}
