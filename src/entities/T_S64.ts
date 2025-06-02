import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S64 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    lvs_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    lvs_pos: number;

    @Column({ type: 'float' })
    v1: number;

    @Column({ type: 'float' })
    v2: number;

    @Column({ type: 'float' })
    v3: number;

    @Column({ type: 'float' })
    i1: number;

    @Column({ type: 'float' })
    i2: number;

    @Column({ type: 'float' })
    i3: number;

    @Column({ type: 'float' })
    in: number;

    @Column()
    simp: number;

    @Column()
    sexp: number;

    @Column()
    bc: string;
}
