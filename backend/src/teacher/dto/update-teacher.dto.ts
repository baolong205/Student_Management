import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create-teacher.dto';

// Kế thừa từ CreateTeacherDto nhưng tất cả trường đều optional
// Có thể chỉ cập nhật một vài trường thay vì tất cả
export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}