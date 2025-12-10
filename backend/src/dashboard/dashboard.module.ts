// dashboard.module.ts
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { ClassesModule } from '../classes/classes.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { TeacherModule } from '../teacher/teacher.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { StudentsModule } from '../student/student.module';

@Module({
  imports: [
    UsersModule,
    ClassesModule,
    SubjectsModule,
    TeacherModule,
    EnrollmentsModule,
    StudentsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}