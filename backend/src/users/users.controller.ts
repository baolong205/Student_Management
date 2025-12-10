// src/users/users.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch, 
  Body, 
  Param, 
  Query, 
  HttpCode, 
  HttpStatus,
  UsePipes,
  ValidationPipe 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }
  @Get('stats')
  async getUserStats() {
    return this.usersService.getUserStats();
  }
  @Get('search')
  async searchUsers(@Query('username') username: string): Promise<User[]> {
    return this.usersService.searchUsersByUsername(username);
  }
  @Get('role/:role')
  async findUsersByRole(@Param('role') role: 'admin' | 'viewer'): Promise<User[]> {
    return this.usersService.findUsersByRole(role);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @Patch(':id/role')
  async changeUserRole(
    @Param('id') id: string,
    @Body() changeRoleDto: ChangeRoleDto
  ): Promise<User> {
    return this.usersService.changeUserRole(id, changeRoleDto);
  }
  @Patch(':id/password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<{ message: string }> {
    await this.usersService.changePassword(id, changePasswordDto);
    return { message: 'Đổi mật khẩu thành công' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}