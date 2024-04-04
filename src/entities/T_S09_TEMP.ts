import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class T_S09_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: string;

    @Column()
    h: string;

    @Column()
    et: number;

    @Column()
    c: number;

    @Column({ nullable: true })
    d1: string;
}