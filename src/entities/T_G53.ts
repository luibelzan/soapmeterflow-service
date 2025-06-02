import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_G53 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column({ type: 'float' })
    vtnMin: number;

    @Column({ type: 'float' })
    vtnAvg: number;

    @Column({ type: 'float' })
    vtnMax: number;

    @Column({ type: 'float' })
    vtnLsm: number;

    @Column()
    bc: string;

}
