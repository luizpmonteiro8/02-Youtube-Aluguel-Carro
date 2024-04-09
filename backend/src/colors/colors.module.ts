import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, PrismaService],
})
export class ColorsModule {}
