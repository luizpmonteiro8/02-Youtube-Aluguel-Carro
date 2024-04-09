import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ClientsService } from './client.service';
import { ClientsController } from './clients.controller';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
})
export class ClientsModule {}
