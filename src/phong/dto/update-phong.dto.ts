import { PartialType } from '@nestjs/mapped-types';
import { CreatePhongDto } from './create-phong.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhongDto extends PartialType(CreatePhongDto) { }
export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    phong: any;
}
export class FilesUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
  }