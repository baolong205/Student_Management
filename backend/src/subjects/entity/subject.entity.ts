// src/subjects/entity/subject.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../enrollments/entity/enrollment.entity';

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

  @OneToMany(() => Enrollment, (enrollment) => enrollment.subject)
  enrollments: Enrollment[];
}