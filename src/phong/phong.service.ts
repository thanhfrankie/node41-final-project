import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { ConfigService } from '@nestjs/config';
import { phong, PrismaClient } from '@prisma/client';

@Injectable()
export class PhongService {
  constructor(private configService: ConfigService) {}
  prisma = new PrismaClient();
  async create(model: any): Promise<phong> {
    const {
      id,
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      moTa,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      hinhAnh,
      maViTri,
    } = model;
    const newRoom = await this.prisma.phong.create({
      data: {
        id,
        tenPhong,
        khach,
        phongNgu,
        giuong,
        phongTam,
        moTa,
        giaTien,
        mayGiat,
        banLa,
        tivi,
        dieuHoa,
        wifi,
        bep,
        doXe,
        hoBoi,
        banUi,
        hinhAnh,
        maViTri,
      },
    });
    return newRoom;
  }

  async findAll(): Promise<phong[]> {
    let data: phong[] = await this.prisma.phong.findMany();
    return data;
  }

  async findOne(id: number) {
    let data = await this.prisma.phong.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Room not found');
    }
    return data;
  }

  async update(id: number, model: any): Promise<phong> {
    let existingRoom = await this.prisma.phong.findUnique({
      where: { id },
    });
    if (!existingRoom) {
      throw new NotFoundException('Room not found');
    }
    const updateRoom = await this.prisma.phong.update({
      where: { id },
      data: model,
    });
    return updateRoom;
  }

  async remove(id: number) {
    let existingRoom = await this.prisma.phong.findUnique({
      where: { id },
    });
    if (!existingRoom) {
      throw new NotFoundException('Room not found');
    }
    await this.prisma.phong.delete({
      where: { id },
    });
    return 'Room deleted successfully';
  }
  async uploadRoomImage(
    file: Express.Multer.File,
    roomId: number,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('File not provided');
    }
    let existingroom = await this.prisma.phong.findUnique({
      where: { id: roomId },
    });
    if (!existingroom) {
      throw new NotFoundException('room not found');
    }

   const uploadResult = await this.prisma.phong.update({
      where: { id: roomId },
      data: {
        hinhAnh: `/public/img/${file.filename}`,
      },
    });

    return {message: 'Images uploaded successfully', file:uploadResult};
  }
  async uploadRoomImages(
    files: Express.Multer.File[],
    roomId: number,
  ): Promise<any> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    let existingRoom = await this.prisma.phong.findUnique({
      where: { id: roomId },
    });
    if (!existingRoom) {
      throw new NotFoundException('room not found');
    }
    const fileUploadPromises = files.map((file) => {
      return this.prisma.phong.update({
        where: { id: roomId },
        data: {
          hinhAnh: `/public/img/${file.filename}`,
        },
      });
    });

    const uploadResults = await Promise.all(fileUploadPromises);

    return { message: 'Images uploaded successfully', files: uploadResults };
  }
}
