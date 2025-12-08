import { IsString, IsEmail, IsOptional, IsDateString, IsInt, Min, MaxLength } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @MaxLength(100)
  firstName: string; // Tên - bắt buộc, tối đa 100 ký tự

  @IsString()
  @MaxLength(100)
  lastName: string; // Họ - bắt buộc, tối đa 100 ký tự

  @IsEmail()
  @MaxLength(100)
  email: string; // Email - bắt buộc, phải là email hợp lệ

  @IsOptional() // Có thể bỏ trống
  @IsString()
  @MaxLength(20)
  phone?: string; // Số điện thoại

  @IsOptional()
  @IsDateString() // Phải là chuỗi ngày tháng hợp lệ
  dateOfBirth?: Date; // Ngày sinh

  @IsOptional()
  @IsString()
  @MaxLength(10)
  gender?: string; // Giới tính

  @IsOptional()
  @IsString()
  address?: string; // Địa chỉ

  @IsOptional()
  @IsString()
  @MaxLength(50)
  specialization?: string; // Chuyên môn

  @IsOptional()
  @IsInt() // Phải là số nguyên
  @Min(0) // Tối thiểu là 0
  yearsOfExperience?: number; // Số năm kinh nghiệm

  @IsOptional()
  @IsString()
  @MaxLength(100)
  qualification?: string; // Bằng cấp

  @IsOptional()
  @IsString()
  classId?: string; // ID lớp học - khóa ngoại

  @IsOptional()
  @IsString()
  subjectId?: string; // ID môn học - khóa ngoại
}