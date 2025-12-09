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
import { Subject } from '../../subjects/entity/subject.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 0 })
  attendanceScore: number;

  @Column({ type: 'float', default: 0 })
  regularScore: number;

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

  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;


  @BeforeInsert()
  @BeforeUpdate()
  calcTotalScore() {
    // Công thức mới: 10% chuyên cần + 25% thường xuyên + 15% giữa kỳ + 50% cuối kỳ
    this.totalScore =
      (this.attendanceScore * 0.1) +
      (this.regularScore * 0.25) +
      (this.midtermScore * 0.15) +
      (this.finalScore * 0.5);
  }
}