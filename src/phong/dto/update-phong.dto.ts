import { PartialType } from '@nestjs/mapped-types';
import { CreatePhongDto } from './create-phong.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhongDto extends PartialType(CreatePhongDto) { }
export class RoomUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    image: any;
}
export class RoomsUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    images: any[];
  }