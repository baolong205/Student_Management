import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Student } from '../../student/entity/student.entity';
import { Subject } from './../../subjects/entity/subject.entity';
@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 0 })
  midtermScore: number;

  @Column({ type: 'float', default: 0 })
  finalScore: number;

  @Column({ type: 'float', default: 0 })
  totalScore: number;

  @CreateDateColumn({ name: 'enrolled_at' })
  enrolledAt: Date;

  @Column({ name: 'subject_id' })
  subjectId: string;
  // Cột khóa ngoại để lưu trữ ID của sinh viên
  @Column({ name: 'student_id' })
  studentId: string;

  // Thiết lập quan hệ Many-to-One trỏ về Student
  @ManyToOne(() => Student, (student) => student.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;
  
  @ManyToOne(() => Subject, (subject) => subject.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
  // Logic tự động tính tổng điểm: 40% giữa kỳ + 60% cuối kỳ
  @BeforeInsert()
  @BeforeUpdate()
  calcTotalScore() {
    this.totalScore = this.midtermScore * 0.4 + this.finalScore * 0.6;
  }
}