import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColorDto: CreateColorDto) {
    try {
      return await this.prisma.color.create({ data: createColorDto });
    } catch (error) {
      throw new ConflictException('Erro ao criar a cor');
    }
  }

  async findAll() {
    try {
      return await this.prisma.color.findMany();
    } catch (error) {
      throw new NotFoundException('Erro ao buscar todas as cores');
    }
  }

  async findOne(id: number) {
    try {
      const color = await this.prisma.color.findUnique({ where: { id } });
      if (!color) {
        throw new NotFoundException('Cor não encontrada');
      }
      return color;
    } catch (error) {
      throw new ConflictException('Erro ao buscar a cor');
    }
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    try {
      return await this.prisma.color.update({
        where: { id },
        data: updateColorDto,
      });
    } catch (error) {
      throw new ConflictException('Erro ao atualizar a cor');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.color.delete({ where: { id } });
    } catch (error) {
      throw new ConflictException('Erro ao excluir a cor');
    }
  }
}
