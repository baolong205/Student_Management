import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Student } from '../../student/entity/student.entity';
import { Teacher } from '../../teacher/entity/teacher.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'int' })
  enrollmentYear: number;

  @Column({ type: 'int', default: 1 })
  currentYear: number;

  @Column({ name: 'max_students', default: 50 })
  maxStudents: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 100 })
  major: string;

 // ========== QUAN HỆ VỚI SINH VIÊN ==========
  // Một lớp có nhiều sinh viên
  @OneToMany(() => Student, (student) => student.class)
  students?: Student[]; // Danh sách sinh viên trong lớp

  // ========== QUAN HỆ VỚI GIÁO VIÊN ==========
  // Một lớp có nhiều giáo viên (giáo viên bộ môn)
  // Quan hệ ngược lại từ Teacher
  @OneToMany(() => Teacher, (teacher) => teacher.class)
  teachers?: Teacher[]; // Danh sách giáo viên dạy lớp này
   // Thuộc tính tính toán: số sinh viên hiện tại
  get currentStudentCount(): number {
    return this.students ? this.students.length : 0;
  }

  // Thuộc tính tính toán: số giáo viên
  get teacherCount(): number {
    return this.teachers ? this.teachers.length : 0;
  }

  // Thuộc tính tính toán: tên đầy đủ của lớp
  get fullClassName(): string {
    return `${this.name} - Khóa ${this.enrollmentYear}`;
  }
}