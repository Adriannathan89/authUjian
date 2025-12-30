import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserService } from 'src/service/user.service';
import { UserController } from 'src/controllers/user.controller';
import { Role } from 'src/entity/role.entity';
import { RoleService } from 'src/service/role.service';
import { Permission } from 'src/entity/permision.entity';
import { PermissionService } from 'src/service/permission.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Role]),
        TypeOrmModule.forFeature([Permission]),
    ],
    controllers: [UserController],
    providers: [UserService, RoleService, PermissionService],
    exports: [UserService, RoleService, PermissionService],
})
export class UserModule {}