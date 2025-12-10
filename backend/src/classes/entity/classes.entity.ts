// src/classes/entity/classes.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

  @OneToMany(() => Student, (student) => student.class)
  students?: Student[];

  // Một lớp có thể có nhiều giáo viên dạy (các môn khác nhau)
  @ManyToMany(() => Teacher, (teacher) => teacher.classes)
  @JoinTable({
    name: 'teacher_classes',
    joinColumn: { name: 'class_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'teacher_id', referencedColumnName: 'id' },
  })
  teachers?: Teacher[];

  get currentStudentCount(): number {
    return this.students?.length || 0;
  }

  get teacherCount(): number {
    return this.teachers?.length || 0;
  }

  get fullClassName(): string {
    return `${this.name} - Khóa ${this.enrollmentYear}`;
  }
}