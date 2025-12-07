// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'MY_SECRET_KEY', 
      signOptions: { expiresIn: '3600s' }, 
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}