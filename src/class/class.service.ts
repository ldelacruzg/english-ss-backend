import { Injectable } from '@nestjs/common';
import { Class } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassService {
    constructor(private readonly prisma: PrismaService) { }

    async getClass(id: number) {
        return this.prisma.class.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                students: true,
                teacher: true
            }
        })
    }

    async getTeacherClasses(teacherId: number) {
        return this.prisma.class.findMany({
            where: {
                teacherId: {
                    equals: teacherId
                }
            },
            select: {
                id: true,
                name: true,
                students: true,
                teacher: true
            }
        })
    }

    async createClass(newclass: Class) {
        return this.prisma.class.create({
            data: {
                name: newclass.name,
                teacherId: newclass.teacherId
            }, select: {
                id: true,
                name: true,
                teacher: true
            }
        })
    }

    async changeClass(studentId: number, classId: number) {
        return this.prisma.student.update({
            data: {
                classId: classId
            }, where: {
                id: studentId
            }, select: {
                id: true,
                user: true,
                classId: true
            }
        })
    }
}
