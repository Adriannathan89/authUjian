import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/service/user.service";

@Controller("/api/user")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post("/register-student")
    async registerStudent(@Body() body: UserDto) {
        const newUser = await this.userService.createUser(body);
        await this.userService.assignRoleToStudent(newUser.username);
        return { 
            success: true,
        };
    }

    @Post("/register-teacher")
    async registerTeacher(@Body() body: UserDto) {
        const newUser = await this.userService.createUser(body);
        await this.userService.assignRoleToTeacher(newUser);
        return { 
            success: true,
        };
    }
}