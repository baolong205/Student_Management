import { IsString, IsNumber, IsOptional, Min, Max, Length, Matches } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @Length(3, 100, { message: 'Tên môn học phải từ 3 đến 100 ký tự' })
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 20, { message: 'Mã môn học phải từ 2 đến 20 ký tự' })
  @Matches(/^[A-Z0-9]+$/, { message: 'Mã môn học chỉ được chứa chữ in hoa và số' })
  subjectCode?: string;

  @IsNumber()
  @Min(1, { message: 'Số tín chỉ tối thiểu là 1' })
  @Max(10, { message: 'Số tín chỉ tối đa là 10' })
  credits: number;

  @IsOptional()
  @IsString()
  @Length(0, 500, { message: 'Mô tả không quá 500 ký tự' })
  description?: string;
}