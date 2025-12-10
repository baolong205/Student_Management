// create-teacher.dto.ts
export class CreateTeacherDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string;
  specialization?: string;
  yearsOfExperience?: number;
  qualification?: string;

  subjectIds?: string[];  // Mảng ID môn học
  classIds?: string[];    // Mảng ID lớp học
}
