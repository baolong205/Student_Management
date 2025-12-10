import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  async create(@Body() dto: CreateSubjectDto) {
    return await this.subjectsService.create(dto);
  }
  @Get()
  async findAll() {
    return await this.subjectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subjectsService.findOne(id);
  }

  @Get('code/:subjectCode')
  async findByCode(@Param('subjectCode') subjectCode: string) {
    return await this.subjectsService.findByCode(subjectCode);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return await this.subjectsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subjectsService.remove(id);
  }
  @Get(':id/enrollments')
  async getSubjectEnrollments(@Param('id') id: string) {
    return await this.subjectsService.getSubjectEnrollments(id);
  }

  @Get(':id/students')
  async getSubjectStudents(@Param('id') id: string) {
    return await this.subjectsService.getSubjectStudents(id);
  }

  @Get(':id/stats')
  async getSubjectStats(@Param('id') id: string) {
    return await this.subjectsService.getSubjectStats(id);
  }
}
