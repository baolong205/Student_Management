
import { IsNotEmpty, IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Tên lớp không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  maxStudents?: number = 50;
}