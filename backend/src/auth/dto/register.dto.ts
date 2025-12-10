
import { IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MinLength(4, { message: 'Tên đăng nhập phải có ít nhất 4 ký tự' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsEnum(['admin', 'viewer'])
  @IsOptional()
  role?: 'admin' | 'viewer';
}