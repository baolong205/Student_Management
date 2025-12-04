// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// Định nghĩa DTO (Data Transfer Object) để nhận dữ liệu từ bên ngoài
interface CreateUserDto {
  username: string;
  password: string;
  role?: 'admin' | 'viewer';
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Tạo và lưu người dùng mới vào cơ sở dữ liệu.
   * LƯU Ý: Hàm @BeforeInsert() trong entity sẽ tự động xử lý hash mật khẩu và tạo UUID.
   */
  async createUser(userData: CreateUserDto): Promise<User> {
    // 1. Tạo một instance của User entity
    const newUser = this.usersRepository.create(userData);

    // 2. Lưu instance vào DB. TypeORM sẽ tự động chạy @BeforeInsert
    // (tạo ID, hash mật khẩu) trước khi lưu.
    return this.usersRepository.save(newUser);
  }

  // Bạn có thể thêm các hàm tìm kiếm, v.v. ở đây...
  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ?? undefined;
  }
}