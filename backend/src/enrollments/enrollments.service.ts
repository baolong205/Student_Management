import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entity/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  // 1. Thêm mới
  async create(dto: CreateEnrollmentDto) {
    const enrollment = this.enrollmentRepo.create(dto);
    return await this.enrollmentRepo.save(enrollment);
  }

  // 2. Lấy tất cả danh sách điểm
  async findAll() {
    return await this.enrollmentRepo.find({ relations: ['student'] });
  }

  // 3. Lấy chi tiết 1 bản ghi điểm
  async findOne(id: string) {
    const record = await this.enrollmentRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Không tìm thấy bản ghi điểm này');
    return record;
  }

  // 4. Sửa điểm (Cập nhật)
  async update(id: string, updateData: Partial<CreateEnrollmentDto>) {
    const record = await this.findOne(id);
    Object.assign(record, updateData);
    // Lưu lại sẽ tự động kích hoạt @BeforeUpdate để tính lại totalScore
    return await this.enrollmentRepo.save(record);
  }

  // 5. Xóa môn học/điểm
  async remove(id: string) {
    const record = await this.findOne(id);
    await this.enrollmentRepo.remove(record);
    return { message: 'Đã xóa bản ghi điểm thành công' };
  }
   async findByStudentId(studentId: string) {
    return await this.enrollmentRepo.find({
      where: { studentId },
      relations: ['subject'], // Load thông tin môn học
      order: { enrolledAt: 'DESC' }
    });
  }

  async findBySubjectId(subjectId: string) {
    return await this.enrollmentRepo.find({
      where: { subjectId },
      relations: ['student'],
      order: { totalScore: 'DESC' }
    });
  }
}