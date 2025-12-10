// src/subjects/subjects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Enrollment } from 'src/enrollments/entity/enrollment.entity';
import { Student } from 'src/student/entity/student.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,

    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,

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
  async getSubjectEnrollments(id: string): Promise<Enrollment[]> {
    const subject = await this.findOne(id);

    return await this.enrollmentRepository.find({
      where: { subjectId: id },
      relations: ['student', 'student.class'],
      order: { enrolledAt: 'DESC' }
    });
  }

  // 8. Lấy danh sách sinh viên đang học môn học
  async getSubjectStudents(id: string): Promise<any[]> {
    const enrollments = await this.getSubjectEnrollments(id);

    return enrollments.map(enrollment => ({
      ...enrollment.student,
      class: enrollment.student.class,
      enrollmentId: enrollment.id,
      scores: {
        attendanceScore: enrollment.attendanceScore,
        regularScore: enrollment.regularScore,
        midtermScore: enrollment.midtermScore,
        finalScore: enrollment.finalScore,
        totalScore: enrollment.totalScore
      },
      enrolledAt: enrollment.enrolledAt
    }));
  }

  // 9. Lấy thống kê môn học
  async getSubjectStats(id: string): Promise<any> {
    const enrollments = await this.getSubjectEnrollments(id);

    if (enrollments.length === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        scoreDistribution: {},
        attendanceRate: 0
      };
    }

    const totalScore = enrollments.reduce((sum, e) => sum + e.totalScore, 0);
    const averageScore = totalScore / enrollments.length;

    // Phân phối điểm
    const scoreDistribution = {
      A: enrollments.filter(e => e.totalScore >= 8.5).length,
      B: enrollments.filter(e => e.totalScore >= 7 && e.totalScore < 8.5).length,
      C: enrollments.filter(e => e.totalScore >= 5.5 && e.totalScore < 7).length,
      D: enrollments.filter(e => e.totalScore >= 4 && e.totalScore < 5.5).length,
      F: enrollments.filter(e => e.totalScore < 4).length
    };

    // Tỷ lệ chuyên cần (giả sử attendanceScore >= 8 là chuyên cần tốt)
    const goodAttendance = enrollments.filter(e => e.attendanceScore >= 8).length;
    const attendanceRate = (goodAttendance / enrollments.length) * 100;

    return {
      totalStudents: enrollments.length,
      averageScore: parseFloat(averageScore.toFixed(2)),
      scoreDistribution,
      attendanceRate: parseFloat(attendanceRate.toFixed(2))
    };
  }

}