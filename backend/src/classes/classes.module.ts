
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class } from './entity/classes.entity';
import { Student } from 'src/student/entity/student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Class,Student])],
    controllers: [
        ClassesController, ClassesController],
    providers: [ClassesService],
    exports: [ClassesService],
})
export class ClassesModule { }