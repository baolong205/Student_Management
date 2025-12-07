import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. Hàm register phải nằm trong class
  async register(registerDto: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const userExist = await this.usersService.findOneByUsername(registerDto.username);
    if (userExist) {
      throw new ConflictException('Username đã tồn tại!');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.usersService.createUser(registerDto);
  }

  // 2. Hàm login phải nằm trong class và sửa lỗi Strict Null Check
  async login(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    
    // Kiểm tra user tồn tại
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    // Tạo JWT Payload
    const payload = { 
      username: user.username, 
      sub: user.id, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}