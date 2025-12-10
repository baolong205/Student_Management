// src/users/dto/update-user.dto.ts
import { IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @IsOptional()
  password?: string;

  @IsEnum(['admin', 'viewer'])
  @IsOptional()
  role?: 'admin' | 'viewer';
}