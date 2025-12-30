import { Module } from "@nestjs/common";
import { Permission } from "src/entity/permision.entity";
import { PermissionService } from "src/service/permission.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/controllers/permission.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Permission]),
    ],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService],
})
export class PermissionModule {}