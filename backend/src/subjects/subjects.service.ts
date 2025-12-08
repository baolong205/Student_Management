// src/subjects/subjects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entity/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  // 1. Tạo môn học mới
  async create(data: { name: string; credits: number }): Promise<Subject> {
    const subject = this.subjectsRepository.create(data);
    return await this.subjectsRepository.save(subject);
  }

  // 2. Lấy danh sách tất cả môn học
  async findAll(): Promise<Subject[]> {
    return await this.subjectsRepository.find();
  }

  // 3. Tìm môn học theo ID
  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException('Môn học không tồn tại');
    return subject;
  }
}