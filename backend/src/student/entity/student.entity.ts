
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Class } from '../../classes/entity/classes.entity';
import { Enrollment } from '../../enrollments/entity/enrollment.entity';
import { OneToMany } from 'typeorm';
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


  @Column({ name: 'class_id', nullable: true })
  classId?: string;

  @ManyToOne(() => Class, (cls) => cls.students, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'class_id' })
  class?: Class;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}