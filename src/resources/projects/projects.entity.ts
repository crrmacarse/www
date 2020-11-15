import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'constants/base.entity';
import { workedOnType } from './projects.interface';

@Entity()
export class Projects extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 25,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'varchar',
        name: 'worked_on'
    })
    workedOn: workedOnType;
 
    @Column({
        type: 'json',
    })
    tags: string[];

    @Column({
       type: 'json' 
    })
    links: any; // @TODO

    @Column({
        type: 'int',
    })
    priority: number;
}