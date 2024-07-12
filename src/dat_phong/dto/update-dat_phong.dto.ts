import { PartialType } from '@nestjs/mapped-types';
import { CreateDatPhongDto } from './create-dat_phong.dto';

export class UpdateDatPhongDto extends PartialType(CreateDatPhongDto) {}
