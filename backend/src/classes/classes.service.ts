// src/classes/classes.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../classes/entity/classes.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const exists = await this.classesRepository.findOne({
      where: { name: createClassDto.name },
    });
    if (exists) {
      throw new ConflictException('Tên lớp đã tồn tại');
    }

    const cls = this.classesRepository.create(createClassDto);
    return this.classesRepository.save(cls);
  }

  findAll(): Promise<Class[]> {
    return this.classesRepository.find({
      relations: ['students'],
      order: { year: 'DESC', name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Class> {
    const cls = await this.classesRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!cls) {
      throw new NotFoundException(`Lớp với ID ${id} không tồn tại`);
    }
    return cls;
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
  
    if (updateClassDto.name) {
      const exists = await this.classesRepository.findOne({
        where: { name: updateClassDto.name },
      });
      if (exists && exists.id !== id) {
        throw new ConflictException('Tên lớp đã tồn tại');
      }
    }

    await this.classesRepository.update(id, updateClassDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.classesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lớp với ID ${id} không tồn tại`);
    }
  }


  async findEmptyClasses(): Promise<Class[]> {
    return this.classesRepository
      .createQueryBuilder('class')
      .leftJoin('class.students', 'student')
      .having('COUNT(student.id) = 0')
      .groupBy('class.id')
      .getMany();
  }
}