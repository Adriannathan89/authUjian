import { Controller, Post, Get } from "@nestjs/common";
import { RoleService } from "src/service/role.service";
import { Body } from "@nestjs/common";

@Controller("/api/role")
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @Post("/create")
    async createRole(@Body() body: { name: string }) {
        const newRole = await this.roleService.createRole(body.name);
        return {
            success: true,
            data: newRole,
        };
    }

    @Post("/assign-permission")
    async assignPermissionToRole(@Body() body: { roleName: string, permissions: string[] }) {
        console.log(body);
        const role = await this.roleService.getRoleByName(body.roleName);
        const updatedRole = await this.roleService.assignePermissionToRole(role, body.permissions); 
        return {
            success: true,
            data: updatedRole,
        };
    }

    @Get("/getName")
    async getRole(@Body() body: { name: string}) {
        const roles = await this.roleService.getRoleByName(body.name);
        return {
            success: true,
            data: roles,
        };
    }
}