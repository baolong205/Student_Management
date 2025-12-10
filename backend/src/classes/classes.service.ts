
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entity/classes.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  // Tạo lớp mới
  async create(dto: CreateClassDto) {
    const exists = await this.classRepo.findOneBy({ name: dto.name });
    if (exists) throw new ConflictException('Tên lớp đã tồn tại');

    const cls = this.classRepo.create(dto);
    return this.classRepo.save(cls);
  }

  findAll() {
    return this.classRepo
      .createQueryBuilder('class')
      .loadRelationCountAndMap('class.currentStudents', 'class.students')
      .orderBy('class.enrollmentYear', 'DESC')
      .addOrderBy('class.name', 'ASC')
      .getMany();
  }

  // Lấy 1 lớp chi tiết + số sinh viên
  async findOne(id: string) {
    const cls = await this.classRepo
      .createQueryBuilder('class')
      .where('class.id = :id', { id })
      .loadRelationCountAndMap('class.currentStudents', 'class.students')
      .leftJoinAndSelect('class.students', 'student') 
      .getOne();

    if (!cls) throw new NotFoundException('Lớp không tồn tại');
    return cls;
  }

  // Cập nhật lớp
  async update(id: string, dto: UpdateClassDto) {
    if (dto.name) {
      const exists = await this.classRepo.findOneBy({ name: dto.name });
      if (exists && exists.id !== id) {
        throw new ConflictException('Tên lớp đã tồn tại');
      }
    }

    await this.classRepo.update(id, dto);
    return this.findOne(id);
  }

  // Xóa lớp
  async remove(id: string) {
    const result = await this.classRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Lớp không tồn tại');
    }
  }

  // Tìm các lớp chưa có sinh viên
  findEmptyClasses() {
    return this.classRepo
      .createQueryBuilder('class')
      .loadRelationCountAndMap('class.currentStudents', 'class.students')
      .having('class.currentStudents = 0')
      .getMany();
  }
}