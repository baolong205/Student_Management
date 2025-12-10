// src/subjects/entity/subject.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Enrollment } from '../../enrollments/entity/enrollment.entity';
import { Teacher } from '../../teacher/entity/teacher.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  subjectCode: string;

  @Column()
  credits: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  department: string;

  @Column({ type: 'int', nullable: true })
  hoursPerWeek: number;

  // ========== QUAN HỆ ĐÚNG ==========

  @OneToMany(() => Enrollment, (enrollment) => enrollment.subject)
  enrollments: Enrollment[];

  // Một môn có thể do nhiều giáo viên dạy
  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  @JoinTable({
    name: 'teacher_subjects', // bảng trung gian
    joinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'teacher_id', referencedColumnName: 'id' },
  })
  teachers: Teacher[];

  // Helper
  get info(): string {
    return `${this.name} (${this.credits} tín chỉ)`;
  }

  get hasTeachers(): boolean {
    return this.teachers?.length > 0;
  }
}