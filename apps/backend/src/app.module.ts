import { Module } from '@nestjs/common';

import { ApartmentsModule } from './apartments/apartments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ApartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
