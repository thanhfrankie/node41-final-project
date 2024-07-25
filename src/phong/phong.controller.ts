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
  BadRequestException,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { RoomsUploadDto, RoomUploadDto, UpdatePhongDto } from './dto/update-phong.dto';
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

// @ApiBearerAuth()
// @UseGuards(AuthGuard('check-jwt'))
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
    type: RoomUploadDto
  })
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload-image/:id")
  uploadRoomImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: string,) {
    const roomId = parseInt(id, 10);
    if (isNaN(roomId)) {
      throw new BadRequestException('Invalid room ID');
    }
    return this.phongService.uploadRoomImage(file, roomId);
  }



  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: RoomsUploadDto
  })
  // upload nhiều file
  @UseInterceptors(FilesInterceptor("images", 5, {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))

  @Post("/upload-multi-image/:id")
  uploadRoomImages(@UploadedFiles() files: Express.Multer.File[],@Param('id') id: string,) {
    const roomId = parseInt(id, 10);
    console.log('Service - files ID:', files);
    if (isNaN(roomId)) {
      throw new BadRequestException('Invalid room ID');
    }
    return this.phongService.uploadRoomImages(files, roomId);
  }
}
