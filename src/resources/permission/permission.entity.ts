import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'constants/base.entity';

@Entity({
    name: 'permissions'
})
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 20,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;
}