// src/subjects/subjects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) { }

  // 1. Tạo môn học mới
  async create(dto: CreateSubjectDto): Promise<Subject> {
    // Kiểm tra mã môn học trùng (nếu có)
    if (dto.subjectCode) {
      const existing = await this.subjectsRepository.findOne({
        where: { subjectCode: dto.subjectCode }
      });
      if (existing) {
        throw new Error('Mã môn học đã tồn tại');
      }
    }

    const subject = this.subjectsRepository.create(dto);
    return await this.subjectsRepository.save(subject);
  }

  // 2. Lấy danh sách tất cả môn học
  async findAll(): Promise<Subject[]> {
    return await this.subjectsRepository.find({
      order: { name: 'ASC' } // Sắp xếp theo tên
    });
  }

  // 3. Tìm môn học theo ID
  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Môn học không tồn tại');
    return subject;
  }

  // 4. Tìm theo mã môn học
  async findByCode(subjectCode: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({
      where: { subjectCode }
    });
    if (!subject) throw new NotFoundException('Mã môn học không tồn tại');
    return subject;
  }

  // 5. Cập nhật môn học
  async update(id: string, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);

    // Kiểm tra mã môn học trùng (nếu có update mã)
    if (dto.subjectCode && dto.subjectCode !== subject.subjectCode) {
      const existing = await this.subjectsRepository.findOne({
        where: { subjectCode: dto.subjectCode }
      });
      if (existing) {
        throw new Error('Mã môn học đã tồn tại');
      }
    }

    // Cập nhật các trường
    Object.assign(subject, dto);

    return await this.subjectsRepository.save(subject);
  }

  // 6. Xóa môn học
  async remove(id: string): Promise<{ message: string }> {
    const subject = await this.findOne(id);
    await this.subjectsRepository.remove(subject);
    return { message: 'Đã xóa môn học thành công' };
  }
}