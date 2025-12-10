// src/teacher/entity/teacher.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Class } from '../../classes/entity/classes.entity';
import { Subject } from '../../subjects/entity/subject.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  specialization?: string;

  @Column({ type: 'int', nullable: true })
  yearsOfExperience?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  qualification?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  // Một giáo viên có thể dạy nhiều môn
  @ManyToMany(() => Subject, (subject) => subject.teachers)
  subjects: Subject[];

  // Một giáo viên có thể dạy nhiều lớp
  @ManyToMany(() => Class, (cls) => cls.teachers)
  classes: Class[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  get details(): string {
    const subjects = this.subjects?.map(s => s.name).join(', ') || 'Chưa có môn';
    const classes = this.classes?.map(c => c.name).join(', ') || 'Chưa có lớp';
    return `${this.fullName} | Môn: ${subjects} | Lớp: ${classes}`;
  }
}