// src/subjects/subjects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsService } from './subjects.service'
import { SubjectsController } from './subjects.controller';
import { Subject } from './entity/subject.entity';
import { Enrollment } from 'src/enrollments/entity/enrollment.entity';
import { Teacher } from 'src/teacher/entity/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject,Enrollment,Teacher])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}