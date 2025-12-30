import { Module } from "@nestjs/common";
import { Role } from "src/entity/role.entity";
import { RoleService } from "src/service/role.service";
import { PermissionService } from "src/service/permission.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "src/controllers/role.controller";
import { Permission } from "src/entity/permision.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        TypeOrmModule.forFeature([Permission]),
    ],
    controllers: [RoleController],
    providers: [RoleService, PermissionService],
    exports: [RoleService],
})
export class RoleModule {}