import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'constants/base.entity';

@Entity({
    name: 'account_permission'
})
export class AccountPermission extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        name: 'account_id',
        type: 'int',
        nullable: false,
    })
    accountId: number;

    @Column({
        name: 'permission_id',
        type: 'int',
        nullable: false,
    })
    permissionId: number;
}