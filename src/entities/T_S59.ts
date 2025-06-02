import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S59 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    lvs_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    lvs_pos: number;

    @Column()
    et: number;

    @Column()
    c: number;
}
