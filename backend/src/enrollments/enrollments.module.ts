// src/enrollments/enrollments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollment.entity';
import { EnrollmentsController } from './enrollments.controller';
import { Student } from 'src/student/entity/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment,Student])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}