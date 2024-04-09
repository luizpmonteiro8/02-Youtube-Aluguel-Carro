import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;
}
