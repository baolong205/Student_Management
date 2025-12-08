
import { IsString, IsInt, Min, Max, IsNotEmpty, Length } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Tên lớp không được để trống' })
  @IsString()
  @Length(3, 50, { message: 'Tên lớp phải từ 3-50 ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Chọn ngành học' })
  @IsString()
  @Length(2, 100)
  major: string;

  @IsInt({ message: 'Năm nhập học phải là số nguyên' })
  @Min(2000)
  @Max(2100)
  enrollmentYear: number;

  @IsInt()
  @Min(1)
  @Max(6, { message: 'Năm học hiện tại tối đa là 6' })
  currentYear?: number;

  @IsInt()
  @Min(10)
  @Max(200, { message: 'Sĩ số tối đa từ 10 đến 200' })
  maxStudents?: number;
}