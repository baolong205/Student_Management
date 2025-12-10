import { IsNotEmpty, IsNumber, IsUUID, Min, Max, IsOptional } from 'class-validator';

export class CreateEnrollmentDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsNumber()
  @Min(0) @Max(10)
  @IsOptional() 
  attendanceScore: number;

  @IsNumber()
  @Min(0) @Max(10)
  @IsOptional() 
  regularScore: number;

  @IsNumber()
  @Min(0) @Max(10)
  @IsOptional()
  midtermScore: number;

  @IsNumber()
  @Min(0) @Max(10)
  @IsOptional() 
  finalScore: number;
}