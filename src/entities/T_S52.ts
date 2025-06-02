import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S52 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    lvs_id: string;

    @PrimaryColumn({ type: 'date' })
    fec_inicio: string;

    @PrimaryColumn({ type: 'time' })
    hor_inicio: string;

    @Column()
    lvs_pos: number;

    @Column()
    lvs_magn: number;

    @Column({ type: 'date' })
    fec_fin: string;

    @Column({ type: 'time' })
    hor_fin: string;

    @Column()
    ai: number;

    @Column()
    ae: number;

    @Column()
    r1: number;

    @Column()
    r2: number;

    @Column()
    r3: number;

    @Column()
    r4: number;

    @Column()
    bc: string;
}
