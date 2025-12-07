// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, // Đảm bảo đã export UsersService từ module này
    JwtModule.register({
      secret: 'MY_SECRET_KEY', // Nên lấy từ .env
      signOptions: { expiresIn: '3600s' }, // Token hết hạn sau 1 giờ
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}