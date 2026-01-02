import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async login(username: string, password: string) {
        const currUser = await this.userService.getStudentByUsername(username);

        if (!currUser) {
            throw new NotFoundException('User not found');
        }

        const valid = await bcrypt.compare(password, currUser.password);
        if (!valid) {
            throw new NotFoundException('Invalid credentials');
        }

        const permisions = currUser.roles.flatMap(role => role.permissions.map(permission => permission.name));

        const payload = {
            username: currUser.username,
            sub: currUser.id,
            roles: currUser.roles.map(role => role.name),
            permissions: permisions
        };


        return {
            userId: currUser.id,
            access_token: this.jwtService.sign(payload),
        };
    }
}