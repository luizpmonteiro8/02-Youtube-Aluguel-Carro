import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  id: number;
}
