import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from 'constants/base.entity';
import { hash } from 'bcrypt';
import { BCRYPT_SALT } from 'constants/default';
import { roleType } from './accounts.interface';

@Entity()
export class Accounts extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 30,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
        select: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        name: 'google_token',
        nullable: false,
        select: false,
    })
    googleToken: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'client',
    })
    role: roleType;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await hash(this.password, BCRYPT_SALT);
    }
}