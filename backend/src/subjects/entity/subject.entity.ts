import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../enrollments/entity/enrollment.entity';
import { Teacher } from '../../teacher/entity/teacher.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // Tên môn học

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  subjectCode: string; // Mã môn học

  @Column()
  credits: number; // Số tín chỉ

  @Column({ type: 'text', nullable: true })
  description: string; // Mô tả môn học

  // ========== THÊM 3 TRƯỜNG QUAN TRỌNG CHO TEACHER ==========
  
  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Môn học có đang hoạt động không
  
  @Column({ type: 'varchar', length: 50, nullable: true })
  department: string; // Khoa/Bộ môn quản lý
  
  @Column({ type: 'int', nullable: true })
  hoursPerWeek: number; // Số giờ dạy mỗi tuần

  // ========== QUAN HỆ VỚI ENROLLMENTS ==========
  @OneToMany(() => Enrollment, (enrollment) => enrollment.subject)
  enrollments: Enrollment[];

  // ========== QUAN HỆ VỚI TEACHERS ==========
  @OneToMany(() => Teacher, (teacher) => teacher.subject)
  teachers: Teacher[];

  // ========== PHƯƠNG THỨC HELPER ĐƠN GIẢN ==========
  
  // Lấy thông tin môn học
  get info(): string {
    return `${this.name} (${this.credits} tín chỉ)`;
  }

  // Kiểm tra môn có giáo viên dạy không
  get hasTeachers(): boolean {
    return this.teachers && this.teachers.length > 0;
  }
}