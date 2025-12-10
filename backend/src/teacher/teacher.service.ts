// src/teacher/teacher.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import { Teacher } from './entity/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Class } from '../classes/entity/classes.entity';
import { Subject } from '../subjects/entity/subject.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Class)
    private classRepo: Repository<Class>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) { }

  // CREATE
  async create(dto: CreateTeacherDto) {
    const teacher = this.teacherRepo.create({
      ...dto,
      subjects: [],
      classes: [],
    });

    // Gán môn học nếu có
    if (dto.subjectIds && dto.subjectIds.length > 0) {
      const subjects = await this.subjectRepo.findBy({ id: In(dto.subjectIds) });
      if (subjects.length !== dto.subjectIds.length) {
        throw new BadRequestException('Một hoặc nhiều môn học không tồn tại');
      }
      teacher.subjects = subjects;
    }

    // Gán lớp học nếu có
    if (dto.classIds && dto.classIds.length > 0) {
      const classes = await this.classRepo.findBy({ id: In(dto.classIds) });
      if (classes.length !== dto.classIds.length) {
        throw new BadRequestException('Một hoặc nhiều lớp không tồn tại');
      }
      teacher.classes = classes;
    }

    return this.teacherRepo.save(teacher);
  }

 
  async findAll() {
    return this.teacherRepo.find({
      relations: ['subjects', 'classes'],
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    const teacher = await this.teacherRepo.findOne({
      where: { id },
      relations: ['subjects', 'classes'],
    });
    if (!teacher) throw new NotFoundException('Giáo viên không tồn tại');
    return teacher;
  }

  // UPDATE
  async update(id: string, dto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);

    // Cập nhật thông tin cơ bản
    Object.assign(teacher, dto);

    // Cập nhật môn học (nếu có trong DTO)
    if (dto.subjectIds !== undefined) {
      if (dto.subjectIds.length === 0) {
        teacher.subjects = [];
      } else {
        const subjects = await this.subjectRepo.findBy({ id: In(dto.subjectIds) });
        if (subjects.length !== dto.subjectIds.length) {
          throw new BadRequestException('Một hoặc nhiều môn học không tồn tại');
        }
        teacher.subjects = subjects;
      }
    }

    // Cập nhật lớp học (nếu có trong DTO)
    if (dto.classIds !== undefined) {
      if (dto.classIds.length === 0) {
        teacher.classes = [];
      } else {
        const classes = await this.classRepo.findBy({ id: In(dto.classIds) });
        if (classes.length !== dto.classIds.length) {
          throw new BadRequestException('Một hoặc nhiều lớp không tồn tại');
        }
        teacher.classes = classes;
      }
    }

    return this.teacherRepo.save(teacher);
  }

  // Hàm xóa giáo viên
  async remove(id: string) {
    const teacher = await this.findOne(id);
    await this.teacherRepo.remove(teacher);
    return { message: 'Xóa giáo viên thành công' };
  }

  // Tìm giáo viên theo môn học
  async findBySubject(subjectId: string) {
    return this.teacherRepo.find({
      where: { subjects: { id: subjectId } },
      relations: ['subjects', 'classes'],
    });
  }

  // Tìm giáo viên theo lớp
  async findByClass(classId: string) {
    return this.teacherRepo.find({
      where: { classes: { id: classId } },
      relations: ['subjects', 'classes'],
    });
  }
  // Tìm kiếm giáo viên theo tên, email, môn học hoặc lớp
  async search(keyword: string) {
    if (!keyword || keyword.trim() === '') {
      return this.findAll();
    }

    const searchTerm = keyword.trim().toLowerCase();

    return this.teacherRepo.find({
      where: [
        // Tìm theo tên (firstName hoặc lastName)
        { firstName: Like(`%${searchTerm}%`) },
        { lastName: Like(`%${searchTerm}%`) },
        { email: Like(`%${searchTerm}%`) },
        // Tìm theo tên môn học
        { subjects: { name: Like(`%${searchTerm}%`) } },
        // Tìm theo tên lớp
        { classes: { name: Like(`%${searchTerm}%`) } },
      ],
      relations: ['subjects', 'classes'],
      order: { lastName: 'ASC', firstName: 'ASC' },
    });
  }
}