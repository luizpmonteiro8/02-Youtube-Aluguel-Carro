import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateClientDto } from './create-clients.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  id: number;
}
