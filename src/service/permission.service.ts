import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/entity/permision.entity";
import { Repository } from "typeorm";

@Injectable()
export class  PermissionService{
    constructor(
        @InjectRepository(Permission)
        private readonly permisionRepository: Repository<Permission>,
    ) {}

    async createPermission(name: string): Promise<Permission> {
        const newPermission = this.permisionRepository.create({ name });
        return this.permisionRepository.save(newPermission);
    }

    async getPermissionByName(name: string): Promise<Permission> {
        const permission = await this.permisionRepository.findOne({where: { name }});
        if (!permission) {
            throw new NotFoundException('Permission not found');
        }
        return permission;
    }
}