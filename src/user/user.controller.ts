import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginInput } from './dto/user.dto';
import { Role, Student, Teacher, User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('login')
    async findCredentials(@Body() data: LoginInput) {
        return this.userService.findCredentials(data.username, data.password);
    }

    @Post('register')
    async createUser(@Body() data: User) {
        this.userService.generateNextUserId().then(res => {
            data.id = res;
        });
        let response = this.userService.createUser(data);
        let student: Student = { id: null, classId: 0, level: 1, userId: (await response).id };
        let teacher: Teacher = { id: null, userId: (await response).id };
        if (response != undefined) {
            if ((await response).role == Role.student) {
                console.log(await this.userService.createStudent(student));
            } else if ((await response).role == Role.teacher) {
                console.log(await this.userService.createTeacher(teacher));
            }
        }
        return response;
    }
}
