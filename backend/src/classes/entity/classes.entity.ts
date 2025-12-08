
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Student } from '../../student/entity/student.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  // Khóa học (năm nhập học)
  @Column({ type: 'int' })
  enrollmentYear: number;
  // Năm học hiện tại của lớp (năm thứ mấy)
  @Column({ type: 'int', default: 1 })
  currentYear: number;
  @Column({ name: 'max_students', default: 50 })
  maxStudents: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 100 })
  major: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
  
  currentStudents?: number;
}