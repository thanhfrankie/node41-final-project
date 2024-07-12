import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { CreateBinhLuanDto } from './dto/create-binh_luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh_luan.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { binh_luan } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
class commentType {
  @ApiProperty()
  id: 0
  @ApiProperty()
  maPhong: 0
  @ApiProperty()
  maNguoiBinhLuan: 0
  @ApiProperty()
  ngayBinhLuan: string
  @ApiProperty()
  noiDung: string
  @ApiProperty()
  saoBinhLuan: 0
}
class deleteCommentType {
  @ApiProperty()
  id: 0
  @ApiProperty()
  maPhong: 0
  @ApiProperty()
  maNguoiBinhLuan: 0
}
@ApiBearerAuth()
@UseGuards(AuthGuard("check-jwt"))
@ApiTags('BinhLuan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  create(@Body() body:commentType) {
    return this.binhLuanService.create(body);
  }

  @Get()
  findAll(){
    return this.binhLuanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binhLuanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body:commentType) {
    return this.binhLuanService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: deleteCommentType) {
    const { maPhong, maNguoiBinhLuan } = body;
    return this.binhLuanService.remove(+id, maPhong, maNguoiBinhLuan);
  }
}
