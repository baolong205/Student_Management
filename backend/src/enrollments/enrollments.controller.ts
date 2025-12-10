import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) { }

  @Post()
  async create(@Body() dto: CreateEnrollmentDto) {
    return await this.enrollmentsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.enrollmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.enrollmentsService.findOne(id);
  }

  @Patch(':id') // Sửa điểm
  async update(@Param('id') id: string, @Body() updateData: any) {

    return await this.enrollmentsService.update(id, updateData);
  }

  @Delete(':id') // Xóa
  async remove(@Param('id') id: string) {
    return await this.enrollmentsService.remove(id);
  }
  @Get('student/:studentId')
  async getByStudentId(@Param('studentId') studentId: string) {
    return this.enrollmentsService.findByStudentId(studentId);
  }
}