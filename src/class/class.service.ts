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
                teacher: true,
            }
        })
    }

    async getStudentsByClass(classId: number) {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                student: {
                    select: {
                        id: true,
                        level: true
                    },
                    where: {
                        classId: {
                            equals: classId
                        }
                    }
                }
            }, where: {
                role: {
                    equals: 'student'
                }
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

    async updateStudentLevel(studentId: number, level: number) {
        return this.prisma.student.update({
            data: {
                level: level
            }, where: {
                id: studentId
            }, select: {
                id: true,
                level: true
            }
        })
    }
}
