import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateRentDto } from './create-rent.dto';

export class UpdateRentDto extends PartialType(CreateRentDto) {
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  id: number;
}
