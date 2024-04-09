import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  id: number;
}
