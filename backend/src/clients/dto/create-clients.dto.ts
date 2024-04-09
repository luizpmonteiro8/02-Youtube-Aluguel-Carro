import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class CreateAddressDto {
  @IsNotEmpty({ message: 'A rua não pode estar vazio' })
  @IsString({ message: 'A rua deve ser uma string' })
  street: string;

  @IsNotEmpty({ message: 'O número não pode estar vazio' })
  @IsInt({ message: 'O número deve ser um número inteiro' })
  number: number;

  @IsNotEmpty({ message: 'A cidade não pode estar vazio' })
  @IsString({ message: 'A cidade deve ser uma string' })
  city: string;

  @IsNotEmpty({ message: 'O estado não pode estar vazio' })
  @IsString({ message: 'O estado deve ser uma string' })
  state: string;

  @IsNotEmpty({ message: 'O Cep não pode estar vazio' })
  @IsString({ message: 'O Cep deve ser uma string' })
  @MaxLength(9, {
    message: 'O Cep deve ter no máximo 9 caracteres',
  })
  zipCode: string;

  @IsNotEmpty({ message: 'O país não pode estar vazio' })
  @IsString({ message: 'O país deve ser uma string' })
  country: string;
}

export class CreateClientDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  @MaxLength(100, {
    message: 'O nome deve ter no máximo 100 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'O cpf não pode estar vazio' })
  @IsString({ message: 'O cpf deve ser uma string' })
  @MaxLength(14, { message: 'O cpf deve ter no máximo 14 caracteres' })
  cpf: string;

  @IsOptional()
  @IsBoolean({ message: 'O ativado deve ser um booleano' })
  enable: boolean;

  @IsNotEmpty({ message: 'A lista de endereços não pode estar vazia' })
  @ArrayMinSize(1, {
    message: 'A lista de endereços deve ter pelo menos 1 item',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}
