import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entity/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Class } from '../classes/entity/classes.entity';
import { Subject } from '../subjects/entity/subject.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);

    // Xử lý classId - chỉ khi có giá trị
    if (createTeacherDto.classId && createTeacherDto.classId.trim() !== '') {
      const classEntity = await this.classRepository.findOne({
        where: { id: createTeacherDto.classId },
      });
      if (!classEntity) {
        throw new NotFoundException(`Không tìm thấy lớp học với ID: ${createTeacherDto.classId}`);
      }
      teacher.class = classEntity;
      teacher.classId = classEntity.id;
    }

    // Xử lý subjectId - chỉ khi có giá trị
    if (createTeacherDto.subjectId && createTeacherDto.subjectId.trim() !== '') {
      const subject = await this.subjectRepository.findOne({
        where: { id: createTeacherDto.subjectId },
      });
      if (!subject) {
        throw new NotFoundException(`Không tìm thấy môn học với ID: ${createTeacherDto.subjectId}`);
      }
      teacher.subject = subject;
      teacher.subjectId = subject.id;
    }

    return await this.teacherRepository.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find({
      relations: ['class', 'subject'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['class', 'subject'],
    });
    
    if (!teacher) {
      throw new NotFoundException(`Không tìm thấy giáo viên với ID: ${id}`);
    }
    
    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    
    if (!teacher) {
      throw new NotFoundException(`Không tìm thấy giáo viên với ID: ${id}`);
    }

    // XỬ LÝ CLASS - SỬ DỤNG delete THAY VÌ null
    if (updateTeacherDto.classId !== undefined) {
      if (updateTeacherDto.classId && updateTeacherDto.classId.trim() !== '') {
        const classEntity = await this.classRepository.findOne({
          where: { id: updateTeacherDto.classId },
        });
        if (!classEntity) {
          throw new NotFoundException(`Không tìm thấy lớp học với ID: ${updateTeacherDto.classId}`);
        }
        teacher.class = classEntity;
        teacher.classId = classEntity.id;
      } else {
        // XÓA QUAN HỆ BẰNG CÁCH ĐẶT undefined
        delete teacher.class;
        delete teacher.classId;
      }
    }

    // XỬ LÝ SUBJECT - SỬ DỤNG delete THAY VÌ null
    if (updateTeacherDto.subjectId !== undefined) {
      if (updateTeacherDto.subjectId && updateTeacherDto.subjectId.trim() !== '') {
        const subject = await this.subjectRepository.findOne({
          where: { id: updateTeacherDto.subjectId },
        });
        if (!subject) {
          throw new NotFoundException(`Không tìm thấy môn học với ID: ${updateTeacherDto.subjectId}`);
        }
        teacher.subject = subject;
        teacher.subjectId = subject.id;
      } else {
        // XÓA QUAN HỆ BẰNG CÁCH ĐẶT undefined
        delete teacher.subject;
        delete teacher.subjectId;
      }
    }

    // CẬP NHẬT CÁC TRƯỜNG KHÁC
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { classId, subjectId, ...rest } = updateTeacherDto;
    Object.assign(teacher, rest);
    
    // Lưu thay đổi
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: string): Promise<void> {
    const result = await this.teacherRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Không tìm thấy giáo viên với ID: ${id}`);
    }
  }

  async findByClass(classId: string): Promise<Teacher[]> {
    return await this.teacherRepository.find({
      where: { classId },
      relations: ['class', 'subject'],
    });
  }

  async findBySubject(subjectId: string): Promise<Teacher[]> {
    return await this.teacherRepository.find({
      where: { subjectId },
      relations: ['class', 'subject'],
    });
  }

  async search(keyword: string): Promise<Teacher[]> {
    return await this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.class', 'class')
      .leftJoinAndSelect('teacher.subject', 'subject')
      .where('teacher.firstName LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('teacher.lastName LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('teacher.email LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }
}