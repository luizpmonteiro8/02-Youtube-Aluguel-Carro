import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { ClientsModule } from './clients/client.module';
import { ColorsModule } from './colors/colors.module';
import { RentsModule } from './rents/rents.module';

@Module({
  imports: [ColorsModule, CarsModule, ClientsModule, RentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
