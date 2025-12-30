import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "src/dto/user.dto";
import { AuthService } from "src/service/auth.service";

@Controller("/api")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("/login")
    async login(@Body() body: UserDto) {
        return this.authService.login(body.username, body.password);
    }
}