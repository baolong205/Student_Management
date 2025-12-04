
import { IsNotEmpty, IsEmail, IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female', 'other'], { message: 'Giới tính không hợp lệ' })
  gender: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUUID()
  classId?: string;
}