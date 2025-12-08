
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  Index,
} from 'typeorm';
import { Student } from '../student/entity/student.entity';
// import { Subject } from '../../subjects/entities/subject.entity';

@Entity('enrollments')
@Index(['student'], { unique: true })
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.enrollments, { onDelete: 'CASCADE' })
  student: Student;

  // @ManyToOne(() => Subject, (subject) => subject.enrollments, { onDelete: 'RESTRICT' })
  // subject: Subject;

  // Học kỳ (ví dụ: 20241, 20242)
  @Column({ type: 'varchar', length: 10 })
  semester: string;
  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0.0 })
  attendanceScore: number;
  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0.0 })
  regularScore: number;
  // Điểm giữa kỳ (0.0 -> 10.0)
  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0.0 })
  midtermScore: number;

  // Điểm cuối kỳ
  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0.0 })
  finalScore: number;

  // Tổng kết 
  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0.0 })
  totalScore: number;

  // Điểm chữ (A, B+, C, F...)
  @Column({ type: 'varchar', length: 3, nullable: true })
  letterGrade?: string;

  @CreateDateColumn()
  enrolledAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calculateScores() {
    const attendanceScore = Number(this.attendanceScore || 0);
    const regularScore = Number(this.regularScore || 0);
    const midterm = Number(this.midtermScore || 0);
    const final = Number(this.finalScore || 0);

    // 10% chuyên cần 25% điểm thường xuyên 15% giữa kỳ + 50% cuối kỳ
    const total = attendanceScore * 0.1 + regularScore * 0.25 + midterm * 0.15 + final * 0.5;
    this.totalScore = Number(total.toFixed(2));

    // Tự động tính điểm chữ (tuỳ trường)
    if (this.totalScore >= 8.5) this.letterGrade = 'A';
    else if (this.totalScore >= 8.0) this.letterGrade = 'B+';
    else if (this.totalScore >= 7.0) this.letterGrade = 'B';
    else if (this.totalScore >= 6.5) this.letterGrade = 'C+';
    else if (this.totalScore >= 5.5) this.letterGrade = 'C';
    else if (this.totalScore >= 4.0) this.letterGrade = 'D';
    else this.letterGrade = 'F';
  }
}