import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O ano não pode estar vazio' })
  @IsInt({ message: 'O ano deve ser um número inteiro' })
  @Min(1900, { message: 'O ano deve ser no mínimo 1900' })
  @Max(2100, { message: 'O ano deve ser no máximo 2100' })
  year: number;

  @IsOptional()
  @IsBoolean({ message: 'A disponibilidade deve ser um booleano' })
  available: boolean;

  @IsNotEmpty({ message: 'O ID da cor não pode estar vazio' })
  @IsInt({ message: 'O ID da cor deve ser um número inteiro' })
  colorId: number;
}
