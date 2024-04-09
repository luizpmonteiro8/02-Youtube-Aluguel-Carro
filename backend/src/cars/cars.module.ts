import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, PrismaService],
})
export class CarsModule {}
