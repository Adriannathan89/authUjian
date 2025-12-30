import { Controller } from "@nestjs/common";
import { PermissionService } from "src/service/permission.service";
import { Body, Post } from "@nestjs/common";

@Controller("/api/permission")
export class PermissionController {
    constructor(
        private readonly permissionService: PermissionService,
    ) {}

    @Post("/create")
    async createPermission(@Body() body: { name: string }) {
        const newPermission = await this.permissionService.createPermission(body.name);
        return {
            success: true,
            data: newPermission,
        };
    }
}