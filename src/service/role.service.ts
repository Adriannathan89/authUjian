import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/entity/role.entity";
import { Repository } from "typeorm";
import { PermissionService } from "./permission.service";

@Injectable()
export class RoleService{
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly permissionService: PermissionService,   
    ) {}

    async createRole(name: string): Promise<Role> {
        const newRole = this.roleRepository.create({ name });
        return this.roleRepository.save(newRole);
    }

    async getRoleByName(name: string): Promise<Role> {
        const currRole = await this.roleRepository.findOne({where: { name }});

        if(!currRole) {
            throw new NotFoundException('Role not found');
        }   
        return currRole;
    }

    async assignePermissionToRole(role: Role, permissions: string[]): Promise<Role> {
        console.log(permissions);
        for (let i = 0; i < permissions.length; i++) {
            const permission = await this.permissionService.getPermissionByName(permissions[i]);
            role.permissions.push(permission);
        }
        return this.roleRepository.save(role);
    }    
}