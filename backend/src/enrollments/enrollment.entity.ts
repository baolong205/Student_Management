// src/enrollments/enrollment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('enrollment')
export class Enrollment {
  // - id: string (Primary Key)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // - midtermScore: num (Kiểu float hoặc decimal cho điểm số)
  @Column({ type: 'float', nullable: true, default: 0 })
  midtermScore: number;

  // - finalScore: num
  @Column({ type: 'float', nullable: true, default: 0 })
  finalScore: number;

  // - totalScore: num
  // Sử dụng Generated Column (hoặc đơn giản là float) để lưu trữ kết quả
  @Column({ type: 'float', default: 0 })
  totalScore: number;

  // - enrolledAt: Date (Sử dụng CreateDateColumn hoặc Column với kiểu timestamp)
  @CreateDateColumn({ type: 'timestamp' })
  enrolledAt: Date;

  // ------------------------------------------------------------------
  // + calcTotalScore() - Hàm logic
  
  // Hook chạy trước khi lưu (Insert) hoặc cập nhật (Update)
  @BeforeInsert()
  @BeforeUpdate()
  calcTotalScore() {
    // Giả sử tổng điểm được tính bằng 40% điểm giữa kỳ và 60% điểm cuối kỳ
    this.totalScore = (this.midtermScore * 0.4) + (this.finalScore * 0.6);
  }

  // Hàm tính toán có thể gọi lại bên ngoài nếu cần (không bắt buộc)
  public getTotalScore(): number {
    return this.totalScore;
  }
}