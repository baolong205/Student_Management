
import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
  @MinLength(4, { message: 'Tên đăng nhập ít nhất 4 ký tự' })
  username: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'viewer'], {
    message: 'Vai trò phải là "admin" hoặc "viewer"',
  })
  role?: 'admin' | 'viewer';
}