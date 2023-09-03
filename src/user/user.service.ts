import { Injectable } from '@nestjs/common';
import { Student, Teacher, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findCredentials(username: string, password: string) {
        return this.prisma.user.findFirst({
            where: {
                username: {
                    equals: username
                },
                password: {
                    equals: password
                }
            },
            select: {
                id: true,
                name: true,
                role: true,
                student: true,
                teacher: true,
            }
        });
    }

    async createUser(user: User) {
        return this.prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                name: user.name,
                role: user.role
            },
            select: {
                id: true,
                name: true,
                role: true,
                student: true,
                teacher: true
            }
        });
    }

    async createTeacher(teacher: Teacher) {
        return this.prisma.teacher.create({
            data: {
                userId: teacher.userId
            },
            select: {
                id: true,
                userId: true
            }
        });
    }

    async createStudent(student: Student) {
        return this.prisma.student.create({
            data: {
                level: student.level,
                class: {
                    connect: {
                        id: student.classId
                    }
                },
                user: {
                    connect: {
                        id: student.userId
                    }
                }
            },
            select: {
                id: true,
                userId: true
            }
        });
    }


    async generateNextUserId() {
        let getNumberRecords = await this.prisma.user.count();
        return getNumberRecords++;
    }

    async generateNextTeacherId() {
        let getNumberRecords = await this.prisma.teacher.count();
        return getNumberRecords + 1;
    }

    async generateNextStudentId() {
        let getNumberRecords = await this.prisma.student.count();
        return getNumberRecords + 1;
    }
}
