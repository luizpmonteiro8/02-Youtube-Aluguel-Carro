import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClientDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-clients.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const { name, enable, cpf, addresses } = createClientDto;
    try {
      return await this.prisma.client.create({
        data: { name, enable, cpf, addresses: { create: addresses } },
      });
    } catch (error) {
      throw new ConflictException('Erro ao criar a cliente');
    }
  }

  async findAll() {
    try {
      return await this.prisma.client.findMany({
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
              state: true,
              zipCode: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Erro ao buscar todas as clientes');
    }
  }

  async findOne(id: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
        include: { addresses: true },
      });
      if (!client) {
        throw new NotFoundException('Cliente não encontrada');
      }
      return client;
    } catch (error) {
      throw new ConflictException('Erro ao buscar a cliente');
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const { name, enable, cpf, addresses } = updateClientDto;
    try {
      return await this.prisma.client.update({
        where: { id },
        data: {
          name,
          enable,
          cpf,
          addresses: {
            deleteMany: {},
            create: addresses,
          },
        },
      });
    } catch (error) {
      throw new ConflictException('Erro ao atualizar a cliente');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.client.delete({ where: { id } });
    } catch (error) {
      console.log(error);

      throw new ConflictException('Erro ao excluir a cliente');
    }
  }
}
