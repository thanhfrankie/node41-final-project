import { PartialType } from '@nestjs/mapped-types';
import { CreateNguoiDungDto } from './create-nguoi_dung.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto extends PartialType(CreateNguoiDungDto) {}
export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    nguoi_dung: any;
}