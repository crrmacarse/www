import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { DEFAULT_ACCOUNT_ID } from 'constants/default';

export class BaseEntity {
    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        select: false,
    })
    deletedAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        type: 'int',
        name: 'updated_by',
        default: DEFAULT_ACCOUNT_ID,
        nullable: false,
    })
    updatedBy: number;

    @Column({
        type: 'tinyint',
        name: 'is_active',
        nullable: false,
        default: true,
        select: false,
    })
    isActive: boolean;
}