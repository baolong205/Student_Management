// src/subjects/subjects.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() data: { name: string; credits: number }) {
    return await this.subjectsService.create(data);
  }

  @Get()
  async findAll() {
    return await this.subjectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subjectsService.findOne(id);
  }
}