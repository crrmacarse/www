import {
    Column, Entity, PrimaryGeneratedColumn,
    BeforeInsert, BeforeUpdate, ManyToMany, JoinTable,
} from 'typeorm';
import { BaseEntity } from 'constants/base.entity';
import { hash } from 'bcrypt';
import { BCRYPT_SALT } from 'constants/default';
import { roleType } from './accounts.interface';
import { Permission } from 'resources/permission/permission.entity';

@Entity({
    name: 'accounts',
})
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 30,
        unique: true,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        select: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        name: 'refresh_token',
        select: false,
        nullable: true,
    })
    refreshToken: string;

    @Column({
        name: 'last_login',
        nullable: true,
    })
    lastLogin: Date;

    @Column({
        type: 'varchar',
        name: 'google_token',
        select: false,
        nullable: true,
    })
    googleToken: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'client',
    })
    role: roleType;

    @Column({
        name: 'need_change',
        nullable: false,
        default: false,
    })
    needChange: boolean;

    @ManyToMany(() => Permission, permission => permission.accounts)
    @JoinTable({
        name: 'account_permission',
        joinColumns: [{
            name: 'account_id',
        }],
        inverseJoinColumns: [{
            name: 'permission_code',
        }],
    })
    permissions: Permission[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await hash(this.password, BCRYPT_SALT);
    }
}