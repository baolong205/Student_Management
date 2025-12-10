
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from '../student/entity/student.entity';
import { Enrollment } from '../enrollments/entity/enrollment.entity';

import { Subject } from '../subjects/entity/subject.entity';
import { Teacher } from 'src/teacher/entity/teacher.entity';
import { User } from 'src/users/entity/user.entity';
import { Class } from 'src/classes/entity/classes.entity';
export const databaseConfig = (): TypeOrmModuleOptions => {
  // Lấy giá trị và có default fallback (tránh undefined)
  const host = process.env.DB_HOST ?? 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const username = process.env.DB_USERNAME ?? 'root';
  const password = process.env.DB_PASSWORD ?? '';
  const database = process.env.DB_DATABASE ?? 'kthp_nest';

  return {
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [Student, Enrollment, Subject,Teacher,User,Class], 
    // autoLoadEntities: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    
  };
};