import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from 'constants/base.entity';
import { Account } from 'resources/accounts/accounts.entity';

@Entity({
    name: 'permissions'
})
export class Permission extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        length: 20,
    })
    code: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ManyToMany(() => Account, account => account.permissions)
    accounts: Account[];
}