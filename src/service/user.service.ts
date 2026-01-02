import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dto/user.dto";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { RoleService } from "./role.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
    ) {}

    async createUser(requestBody: UserDto): Promise<User> {
        requestBody.password = await bcrypt.hash(requestBody.password, 10);
        const newUser = new User(requestBody.username, requestBody.email, requestBody.password);

        return this.userRepository.save(newUser);
    }

    async getStudentByUsername(username: string): Promise<User> {
        const currUser = await this.userRepository.findOne({
            where: { username },
            relations: ['roles', 'roles.permissions'] 
        });
        
        if(!currUser) {
            throw new NotFoundException('User not found');
        }

        return currUser;
    }

    async assignRoleToStudent(username: string): Promise<User> {
        const user = await this.getStudentByUsername(username);
        const role = await this.roleService.getRoleByName("student");
        user.roles.push(role);
        return this.userRepository.save(user);
    }

    async assignRoleToTeacher(user: User): Promise<User> {
        const role = await this.roleService.getRoleByName("teacher");
        user.roles.push(role);
        return this.userRepository.save(user);
    }
}