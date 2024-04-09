import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty({ message: 'O valor diário não pode estar vazio' })
  @IsNumber({}, { message: 'O valor diário deve ser um número' })
  dayValue: number;

  @IsNotEmpty({ message: 'A data de início não pode estar vazia' })
  @IsDateString(
    {},
    {
      message: 'A data de início deve estar em um formato de data válido',
    },
  )
  startDate: string;

  @IsNotEmpty({ message: 'A data de término não pode estar vazia' })
  @IsDateString(
    {},
    {
      message: 'A data de término deve estar em um formato de data válido',
    },
  )
  endDate: string;

  @IsNotEmpty({ message: 'O valor total não pode estar vazio' })
  @IsNumber({}, { message: 'O valor total deve ser um número' })
  total: number;

  @IsNotEmpty({ message: 'O ID do carro não pode estar vazio' })
  @IsNumber({}, { message: 'O ID do carro deve ser um número' })
  carId: number;

  @IsNotEmpty({ message: 'O ID do cliente não pode estar vazio' })
  @IsNumber({}, { message: 'O ID do cliente deve ser um número' })
  clientId: number;
}
