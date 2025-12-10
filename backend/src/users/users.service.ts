
import { 
  Injectable, 
  BadRequestException, 
  NotFoundException,
  ConflictException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Tạo người dùng mới
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Tên đăng nhập đã tồn tại!');
    }

    // Tạo user mới
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      order: { createdAt: 'DESC' }
    });
  }
  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }
  async searchUsersByUsername(username: string): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username LIKE :username', { username: `%${username}%` })
      .getMany();
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    
    // Nếu cập nhật username, kiểm tra trùng
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findOneByUsername(updateUserDto.username);
      if (existingUser) {
        throw new ConflictException('Tên đăng nhập đã tồn tại!');
      }
    }

    // Cập nhật thông tin
    Object.assign(user, updateUserDto);
    
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findOneById(id);
    await this.usersRepository.remove(user);
  }

  async changeUserRole(id: string, changeRoleDto: ChangeRoleDto): Promise<User> {
    const user = await this.findOneById(id);
    
    user.role = changeRoleDto.role;
    
    return await this.usersRepository.save(user);
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.findOneById(id);
    
    // Kiểm tra mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password
    );
    
    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng');
    }
    user.password = changePasswordDto.newPassword;
    await this.usersRepository.save(user);
  }
  async findUsersByRole(role: 'admin' | 'viewer'): Promise<User[]> {
    return await this.usersRepository.find({
      where: { role },
      order: { createdAt: 'DESC' }
    });
  }
  async getUserStats(): Promise<{
    total: number;
    adminCount: number;
    viewerCount: number;
  }> {
    const [users, adminCount, viewerCount] = await Promise.all([
      this.usersRepository.find(),
      this.usersRepository.count({ where: { role: 'admin' } }),
      this.usersRepository.count({ where: { role: 'viewer' } }),
    ]);

    return {
      total: users.length,
      adminCount,
      viewerCount,
    };
  }
}