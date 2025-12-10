import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post() 
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get() 
  findAll() {
    return this.teacherService.findAll();
  }

  @Get('search') 
  search(@Query('q') keyword: string) {
    return this.teacherService.search(keyword);
  }

  @Get('class/:classId') 
  findByClass(@Param('classId', ParseUUIDPipe) classId: string) {
    return this.teacherService.findByClass(classId);
  }

  @Get('subject/:subjectId')
  findBySubject(@Param('subjectId', ParseUUIDPipe) subjectId: string) {
    return this.teacherService.findBySubject(subjectId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teacherService.remove(id);
  }
}