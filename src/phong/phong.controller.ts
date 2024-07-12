import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { FilesUploadDto, FileUploadDto, UpdatePhongDto } from './dto/update-phong.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

class updateRoomType {
  @ApiProperty()
  id: number;
  @ApiProperty()
  tenPhong: string;
  @ApiProperty()
  khach: number;
  @ApiProperty()
  phongNgu: number;
  @ApiProperty()
  giuong: number;
  @ApiProperty()
  phongTam: number;
  @ApiProperty()
  moTa: string;
  @ApiProperty()
  giaTien: number;
  @ApiProperty()
  mayGiat: Boolean;
  @ApiProperty()
  banLa: Boolean;
  @ApiProperty()
  tivi: Boolean;
  @ApiProperty()
  dieuHoa: Boolean;
  @ApiProperty()
  wifi: Boolean;
  @ApiProperty()
  bep: Boolean;
  @ApiProperty()
  doXe: Boolean;
  @ApiProperty()
  hoBoi: Boolean;
  @ApiProperty()
  banUi: Boolean;
  @ApiProperty()
  hinhAnh: string;
  @ApiProperty()
  maViTri: number;
}

@ApiBearerAuth()
@UseGuards(AuthGuard('check-jwt'))
@ApiTags('Phong')
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Post()
  create(@Body() body: updateRoomType) {
    return this.phongService.create(body);
  }

  @Get()
  findAll() {
    return this.phongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: updateRoomType) {
    return this.phongService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phongService.remove(+id);
  }
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUploadDto
  })
  @UseInterceptors(FileInterceptor("phong", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload-image")
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return file
  }



  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FilesUploadDto
  })
  // upload nhiều file
  @UseInterceptors(FilesInterceptor("phong", 5, {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))

  @Post("/upload-multi-image")
  uploadListImage(@UploadedFiles() files: Express.Multer.File[]) {
    return files;
  }
}
