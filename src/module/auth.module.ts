import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { keys } from '../config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';
import { AuthController } from 'src/controllers/auth.controller';
import { Role } from 'src/entity/role.entity';
import { Permission } from 'src/entity/permision.entity';
import { PermissionService } from 'src/service/permission.service';
import { RoleService } from 'src/service/role.service';


@Module({
    imports: [
        JwtModule.register({
            privateKey: keys.privateKey,
            publicKey: keys.publicKey,
            signOptions: { 
                algorithm: 'RS256',
                expiresIn: '60m' 
            },
        }),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Role]),
        TypeOrmModule.forFeature([Permission]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, RoleService, PermissionService],
    exports: [AuthService],
})
export class AuthModule {}