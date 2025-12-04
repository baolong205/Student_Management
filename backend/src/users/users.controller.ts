// src/users/users.controller.ts
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

// Định nghĩa lại DTO (hoặc import từ file DTO riêng)
class CreateUserDto {
    username: string;
    password: string;
    role?: 'admin' | 'viewer';
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201) // Trả về mã 201 Created
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Gọi hàm service để tạo người dùng
    return this.usersService.createUser(createUserDto);
  }
}