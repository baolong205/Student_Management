
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

  @Column({ type: 'year' })
  year: number;

  @Column({ name: 'max_students', default: 50 })
  maxStudents: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  
  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}