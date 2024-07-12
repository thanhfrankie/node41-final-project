import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ViTriService } from './vi_tri.service';
import { CreateViTriDto } from './dto/create-vi_tri.dto';
import { UpdateViTriDto } from './dto/update-vi_tri.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class vi_triType  {
  @ApiProperty()
  id: 0
  @ApiProperty()
  tenViTri: string
  @ApiProperty()
  tinhThanh: string
  @ApiProperty()
  quocGia: string
  @ApiProperty()
  hinhAnh: string
 }
 @ApiBearerAuth()
 @UseGuards(AuthGuard("check-jwt"))
@ApiTags('ViTri')
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  @Post()
  create(@Body() body: vi_triType) {
    return this.viTriService.create(body);
  }

  @Get()
  findAll() {
    return this.viTriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viTriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body:vi_triType) {
    return this.viTriService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viTriService.remove(+id);
  }
}
