import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarDto: CreateCarDto) {
    try {
      return await this.prisma.car.create({ data: createCarDto });
    } catch (error) {
      throw new ConflictException('Erro ao criar a carro');
    }
  }

  async findAll() {
    try {
      return await this.prisma.car.findMany({
        select: {
          id: true,
          name: true,
          available: true,
          year: true,
          color: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Erro ao buscar todas as carros');
    }
  }

  async findOne(id: number) {
    try {
      const car = await this.prisma.car.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          available: true,
          year: true,
          color: true,
        },
      });
      if (!car) {
        throw new NotFoundException('Carro não encontrada');
      }
      return car;
    } catch (error) {
      throw new ConflictException('Erro ao buscar a carro');
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
      return await this.prisma.car.update({
        where: { id },
        data: updateCarDto,
      });
    } catch (error) {
      throw new ConflictException('Erro ao atualizar a carro');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.car.delete({ where: { id } });
    } catch (error) {
      throw new ConflictException('Erro ao excluir a carro');
    }
  }
}
