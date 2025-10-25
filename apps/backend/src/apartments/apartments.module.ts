import { Module } from '@nestjs/common';

import { ApartmentsController } from './apartments.controller';
import { ApartmentsRepository } from './apartments.repository';
import { ApartmentsService } from './apartments.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, ApartmentsRepository],
  exports: [ApartmentsService],
})
export class ApartmentsModule {}
