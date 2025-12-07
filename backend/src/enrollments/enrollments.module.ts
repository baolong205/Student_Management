// src/enrollments/enrollments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './entity/enrollment.entity';
import { EnrollmentsController } from './enrollments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}