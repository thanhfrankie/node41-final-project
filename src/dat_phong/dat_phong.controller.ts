import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DatPhongService } from './dat_phong.service';
import { CreateDatPhongDto } from './dto/create-dat_phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat_phong.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class dat_phongType {
    @ApiProperty()
  id: number
    @ApiProperty()
  maPhong: number
    @ApiProperty()
  ngayDen: string
    @ApiProperty()
  ngayDi: string
    @ApiProperty()
  soLuongKhach: number
    @ApiProperty()
  maNguoiDung: number
   
}

@ApiBearerAuth()
@UseGuards(AuthGuard("check-jwt"))
@ApiTags('DatPhong')
@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @Post()
  create(@Body() body: dat_phongType) {
    return this.datPhongService.create(body);
  }

  @Get()
  findAll() {
    return this.datPhongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datPhongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body:dat_phongType) {
    return this.datPhongService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datPhongService.remove(+id);
  }
}
