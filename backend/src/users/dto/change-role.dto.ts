
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @IsEnum(['admin', 'viewer'], { message: 'Vai trò phải là admin hoặc viewer' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: 'admin' | 'viewer';
}