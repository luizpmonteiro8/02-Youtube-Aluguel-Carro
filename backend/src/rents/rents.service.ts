import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';

@Injectable()
export class RentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRentDto: CreateRentDto) {
    const { startDate, endDate, dayValue, total, clientId, carId } =
      createRentDto;
    try {
      return await this.prisma.rent.create({
        data: {
          startDate,
          endDate,
          dayValue,
          total,
          client: { connect: { id: clientId } },
          car: { connect: { id: carId } },
        },
      });
    } catch (error) {
      throw new ConflictException('Erro ao criar a aluguel');
    }
  }

  async findAll() {
    try {
      return await this.prisma.rent.findMany({
        select: {
          id: true,
          dayValue: true,
          total: true,
          startDate: true,
          endDate: true,
          car: {
            select: {
              id: true,
              name: true,
              available: true,
              year: true,
              color: true,
            },
          },
          client: {
            select: {
              id: true,
              name: true,
              enable: true,
              cpf: true,
              addresses: {
                select: {
                  id: true,
                  street: true,
                  number: true,
                  city: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Erro ao buscar todas as alugueis');
    }
  }

  async findOne(id: number) {
    try {
      const rent = await this.prisma.rent.findUnique({
        where: { id },
        select: {
          id: true,
          dayValue: true,
          total: true,
          startDate: true,
          endDate: true,
          car: {
            select: {
              id: true,
              name: true,
              available: true,
              year: true,
              color: true,
            },
          },
          client: {
            select: {
              id: true,
              name: true,
              enable: true,
              cpf: true,
              addresses: {
                select: {
                  id: true,
                  street: true,
                  number: true,
                  city: true,
                },
              },
            },
          },
        },
      });
      if (!rent) {
        throw new NotFoundException('Aluguel não encontrada');
      }
      return rent;
    } catch (error) {
      throw new ConflictException('Erro ao buscar a aluguel');
    }
  }

  async update(id: number, updateRentDto: UpdateRentDto) {
    const { startDate, endDate, dayValue, total, clientId, carId } =
      updateRentDto;
    try {
      return await this.prisma.rent.update({
        where: { id },
        data: {
          startDate,
          endDate,
          dayValue,
          total,

          client: { connect: { id: clientId } },
          car: { connect: { id: carId } },
        },
      });
    } catch (error) {
      throw new ConflictException('Erro ao atualizar a aluguel');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.rent.delete({ where: { id } });
    } catch (error) {
      throw new ConflictException('Erro ao excluir a aluguel');
    }
  }
}
