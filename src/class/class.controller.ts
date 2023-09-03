import { Controller, Get, Post, Put, ParseIntPipe, Param, Body } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class, Student } from '@prisma/client';

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) { }

    @Get(':classId')
    async getClass(@Param('classId', ParseIntPipe) classId: number) {
        return this.classService.getClass(classId);
    }

    @Get('teacher/:teacherId')
    async getClassesByTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
        return this.classService.getTeacherClasses(teacherId);
    }

    @Post('register')
    async createClass(@Body() data: Class) {
        return this.classService.createClass(data);
    }

    @Put('updateStudent')
    async changeStudentClass(@Body() data: { studentId: number, classId, number }) {
        return this.classService.changeClass(data.studentId, data.classId);
    }

}
