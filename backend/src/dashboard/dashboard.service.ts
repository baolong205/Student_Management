// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ClassesService } from '../classes/classes.service';
import { SubjectsService } from '../subjects/subjects.service';
import { TeacherService } from '../teacher/teacher.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { StudentService } from '../student/student.service';

@Injectable()
export class DashboardService {
  constructor(
    private userSvc: UsersService,
    private classSvc: ClassesService,
    private subjectSvc: SubjectsService,
    private teacherSvc: TeacherService,
    private enrollSvc: EnrollmentsService,
    private studentSvc: StudentService,
  ) {}

  async getDashboard() {
    const [users, classes, subjects, teachers, enrollments, totalStudents] = await Promise.all([
      this.userSvc.getUserStats(),
      this.classSvc.findAll().then(arr => arr.length),
      this.subjectSvc.findAll().then(arr => arr.length),
      this.teacherSvc.findAll().then(arr => arr.length),
      this.enrollSvc.findAll(),
      this.studentSvc.count(),
    ]);

    return {
      totalStudents,
      totalClasses: classes,
      totalSubjects: subjects,
      totalTeachers: teachers,
      totalEnrollments: enrollments.length,
      totalAdmins: users.adminCount,
      totalViewers: users.viewerCount,
    };
  }
}