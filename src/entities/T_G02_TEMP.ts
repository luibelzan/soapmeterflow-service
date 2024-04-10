import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G02_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: string;

    @Column()
    atime: number;

    @Column()
    nchanges: number;

    @Column()
    aconc: number;

    @Column()
    atimeperc: number;
}