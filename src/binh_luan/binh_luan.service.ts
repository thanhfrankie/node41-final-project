import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh_luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh_luan.dto';
import { binh_luan, PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BinhLuanService {
  constructor(private configService: ConfigService) {
    
  }
  prisma = new PrismaClient();
 async  create(model: any):Promise<binh_luan>  {
   const { id, maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } = model
   const newComment = await this.prisma.binh_luan.create({
     data: {
      id, maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan
     }
    }) 
    return newComment
  }

 async  findAll(): Promise<binh_luan[]> {
  let data: binh_luan[] = await this.prisma.binh_luan.findMany();
  return data;
  }

 async  findOne(id: number) : Promise<binh_luan>{
  let data= await this.prisma.binh_luan.findUnique({
    where:{id}
 });
 if (!data) {
  throw new NotFoundException('Comment not found');
}
  return data;
  }

 async  update(id: number,model:any ):Promise<binh_luan>  {
  let existingComment= await this.prisma.binh_luan.findUnique({
    where:{id}
 });
 if (!existingComment) {
  throw new NotFoundException('Comment not found');
}

const updateComment = await this.prisma.binh_luan.update({
  where: { id },
  data: model,
});
return updateComment;
  }

  async remove(id: number,  maPhong: number,maNguoiBinhLuan: number) {
    let data= await this.prisma.binh_luan.findFirst({
      where:{id, maPhong, maNguoiBinhLuan}
   });
   if (!data) {
    throw new NotFoundException('Comment not found');
    }
    await this.prisma.binh_luan.delete({
      where:{id}
    });
    return 'User deleted successfully';
  }
}
