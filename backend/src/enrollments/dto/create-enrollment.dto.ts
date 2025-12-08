import { IsNotEmpty, IsNumber, IsUUID, Min, Max } from 'class-validator';

export class CreateEnrollmentDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsNumber()
  @Min(0) @Max(10)
  midtermScore: number;

  @IsNumber()
  @Min(0) @Max(10)
  finalScore: number;
}