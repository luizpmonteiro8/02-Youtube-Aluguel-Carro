import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';

@Module({
  controllers: [RentsController],
  providers: [RentsService, PrismaService],
})
export class RentsModule {}
