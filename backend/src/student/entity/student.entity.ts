// src/students/entities/student.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../classes/entities/class.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Quan hệ với Class (một sinh viên thuộc một lớp)
  @Column({ name: 'class_id', nullable: true })
  classId?: string;

  @ManyToOne(() => Class, (cls) => cls.students, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'class_id' })
  class?: Class;
}