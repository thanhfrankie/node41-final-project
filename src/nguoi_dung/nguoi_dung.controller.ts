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
  BadRequestException,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi_dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi_dung.dto';
import { UploadAvatarDto, UpdateNguoiDungDto } from './dto/update-nguoi_dung.dto';
import { NguoiDungType } from './entities/nguoi_dung.entity';
import { nguoi_dung } from '@prisma/client';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class nguoi_dungType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
}
class update_nguoi_dungType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  role: string;
}

// @ApiBearerAuth()
// @UseGuards(AuthGuard("check-jwt"))
@ApiTags('NguoiDung')
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Post()
  create(@Body() body: nguoi_dungType) {
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
  update(@Param('id') id: number, @Body() body: update_nguoi_dungType) {
    return this.nguoiDungService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.nguoiDungService.remove(+id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadAvatarDto,
    description: "Avatar"
  })
  @UseInterceptors(
    // nguoi_dung = key ở FileUploadDto
    FileInterceptor('image', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar/:id')
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log('Service - File:', file);
    const userId = parseInt(id, 10);
    console.log('Service - User ID:', userId);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.nguoiDungService.uploadAvatar(file, userId);
  }
  // @Post('/upload-avatar/:id')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: FileUploadDto })
  // @UseInterceptors(
  //   FileInterceptor('nguoi_dung', {
  //     storage: diskStorage({
  //       destination: './public/img',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //         callback(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // async uploadAvatar(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id') id: string,
  // ) {
  //   const userId = parseInt(id, 10);
  //   if (isNaN(userId)) {
  //     throw new BadRequestException('Invalid user ID');
  //   }
  //   return this.nguoiDungService.uploadAvatar(file, userId);
  // }
}
