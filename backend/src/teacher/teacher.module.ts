import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entity/teacher.entity';
import { Class } from '../classes/entity/classes.entity';
import { Subject } from '../subjects/entity/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Class, Subject]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}