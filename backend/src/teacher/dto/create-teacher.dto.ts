import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
  IsUUID,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'Họ không được để trống' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự' })
  @MaxLength(15, { message: 'Số điện thoại không được quá 15 ký tự' })
  phone?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày sinh phải đúng định dạng YYYY-MM-DD' })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true, message: 'SubjectId phải là UUID hợp lệ' })
  subjectIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true, message: 'ClassId phải là UUID hợp lệ' })
  classIds?: string[];
}
