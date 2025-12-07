// src/users/users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Tạo người dùng mới
   * Mật khẩu sẽ được tự động hash nhờ @BeforeInsert() trong entity
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    // Kiểm tra username đã tồn tại chưa (rất quan trọng cho đồ án!)
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('Tên đăng nhập đã tồn tại!');
    }

    // Tạo user mới → TypeORM sẽ tự chạy @BeforeInsert (hash password + tạo UUID)
    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  // Tìm user theo username (dùng cho login)
  async findOneByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  // Tìm user theo ID (nếu cần)
  async findOneById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }
}