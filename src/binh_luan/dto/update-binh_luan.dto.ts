import { PartialType } from '@nestjs/mapped-types';
import { CreateBinhLuanDto } from './create-binh_luan.dto';

export class UpdateBinhLuanDto extends PartialType(CreateBinhLuanDto) {}
