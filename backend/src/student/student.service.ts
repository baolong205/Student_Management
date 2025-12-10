
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entity/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    //Check xem co trung sinh vien khong
    const existing = await this.studentsRepository.findOne({
      where: { email: createStudentDto.email },
    });
    if (existing) {
      throw new ConflictException('Email đã tồn tại');
    }

    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find({
      relations: ['class'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['class', 'enrollments'],
    });
    if (!student) {
      throw new NotFoundException(`Sinh viên với ID ${id} không tồn tại`);
    }
    return student;
  }
  async count(): Promise<number> {
    return await this.studentsRepository.count();
  }
  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    await this.studentsRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sinh viên với ID ${id} không tồn tại`);
    }
  }

  // Tìm kiếm theo tên hoặc email
  async search(query: string): Promise<Student[]> {
    return this.studentsRepository
      .createQueryBuilder('student')
      .where('student.name LIKE :query', { query: `%${query}%` })
      .orWhere('student.email LIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('student.class', 'class')
      .getMany();
  }
}