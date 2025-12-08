import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../classes/entity/classes.entity'; // ĐƯỜNG DẪN ĐÚNG
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // ========== KHÓA NGOẠI ==========
  @Column({ type: 'uuid', nullable: true })
  classId?: string;

  @Column({ type: 'uuid', nullable: true })
  subjectId?: string;

  // ========== QUAN HỆ VỚI LỚP HỌC ==========
  @ManyToOne(() => Class, (classEntity) => classEntity.teachers, { 
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'classId' })
  class?: Class;

  // ========== QUAN HỆ VỚI MÔN HỌC ==========
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Subject, (subject) => subject.teachers, { 
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'subjectId' })
  subject?: Subject;

  // ========== PHƯƠNG THỨC HELPER ==========
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get details(): string {
    const classInfo = this.class ? `Lớp: ${this.class.name}` : 'Chưa có lớp';
    const subjectInfo = this.subject ? `Môn: ${this.subject.name}` : 'Chưa có môn';
    return `${this.fullName} - ${classInfo} - ${subjectInfo}`;
  }
}