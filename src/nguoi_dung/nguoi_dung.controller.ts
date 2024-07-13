import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi_dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi_dung.dto';
import {  FileUploadDto, UpdateNguoiDungDto } from './dto/update-nguoi_dung.dto';
import { NguoiDungType } from './entities/nguoi_dung.entity';
import { nguoi_dung } from '@prisma/client';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class nguoi_dungType {

  @ApiProperty()

  name: string

  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @ApiProperty()
  phone: string
}
class update_nguoi_dungType {

  @ApiProperty()

  name: string

  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @ApiProperty()
  phone: string
  @ApiProperty()
  role: string
}


// @ApiBearerAuth()
// @UseGuards(AuthGuard("check-jwt"))
@ApiTags('NguoiDung')
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Post()
  create(@Body() body:nguoi_dungType) {
    return this.nguoiDungService.create(body);
  }

  @Get()
  findAll() {
    return this.nguoiDungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nguoiDungService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body:update_nguoi_dungType,
  ) {
    return this.nguoiDungService.update(+id,body );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.nguoiDungService.remove(+id);
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @UseInterceptors(
    // nguoi_dung = key ở FileUploadDto
    FileInterceptor('nguoi_dung', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar')
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() body: { id: number },
  ) {
    return this.nguoiDungService.uploadAvatar(file, body.id);
  }
}
