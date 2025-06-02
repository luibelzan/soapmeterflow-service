import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S82 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    lvs_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    lvs_pos: number;

    @Column()
    i1max_fh: Date;

    @Column({ type: 'float' })
    i1max_v1: number;

    @Column({ type: 'float' })
    i1max_v2: number;

    @Column({ type: 'float' })
    i1max_v3: number;

    @Column({ type: 'float' })
    i1max_i1: number;

    @Column({ type: 'float' })
    i1max_i2: number;

    @Column({ type: 'float' })
    i1max_i3: number;

    @Column({ type: 'float' })
    i1max_in: number;

    @Column()
    i1max_simp: number;

    @Column()
    i1max_sexp: number;

    @Column()
    i1max_bc: string;

    @Column()
    i2max_fh: Date;

    @Column({ type: 'float' })
    i2max_v1: number;

    @Column({ type: 'float' })
    i2max_v2: number;

    @Column({ type: 'float' })
    i2max_v3: number;

    @Column({ type: 'float' })
    i2max_i1: number;

    @Column({ type: 'float' })
    i2max_i2: number;

    @Column({ type: 'float' })
    i2max_i3: number;

    @Column({ type: 'float' })
    i2max_in: number;

    @Column()
    i2max_simp: number;

    @Column()
    i2max_sexp: number;

    @Column()
    i2max_bc: string;

    @Column()
    i3max_fh: Date;

    @Column({ type: 'float' })
    i3max_v1: number;

    @Column({ type: 'float' })
    i3max_v2: number;

    @Column({ type: 'float' })
    i3max_v3: number;

    @Column({ type: 'float' })
    i3max_i1: number;

    @Column({ type: 'float' })
    i3max_i2: number;

    @Column({ type: 'float' })
    i3max_i3: number;

    @Column({ type: 'float' })
    i3max_in: number;

    @Column()
    i3max_simp: number;

    @Column()
    i3max_sexp: number;

    @Column()
    i3max_bc: string;

    @Column()
    inmax_fh: Date;

    @Column({ type: 'float' })
    inmax_v1: number;

    @Column({ type: 'float' })
    inmax_v2: number;

    @Column({ type: 'float' })
    inmax_v3: number;

    @Column({ type: 'float' })
    inmax_i1: number;

    @Column({ type: 'float' })
    inmax_i2: number;

    @Column({ type: 'float' })
    inmax_i3: number;

    @Column({ type: 'float' })
    inmax_in: number;

    @Column()
    inmax_simp: number;

    @Column()
    inmax_sexp: number;

    @Column()
    inmax_bc: string;

    @Column()
    v1max_fh: Date;

    @Column({ type: 'float' })
    v1max_v1: number;

    @Column({ type: 'float' })
    v1max_v2: number;

    @Column({ type: 'float' })
    v1max_v3: number;

    @Column({ type: 'float' })
    v1max_i1: number;

    @Column({ type: 'float' })
    v1max_i2: number;

    @Column({ type: 'float' })
    v1max_i3: number;

    @Column({ type: 'float' })
    v1max_in: number;

    @Column()
    v1max_simp: number;

    @Column()
    v1max_sexp: number;

    @Column()
    v1max_bc: string;

    @Column()
    v2max_fh: Date;

    @Column({ type: 'float' })
    v2max_v1: number;

    @Column({ type: 'float' })
    v2max_v2: number;

    @Column({ type: 'float' })
    v2max_v3: number;

    @Column({ type: 'float' })
    v2max_i1: number;

    @Column({ type: 'float' })
    v2max_i2: number;

    @Column({ type: 'float' })
    v2max_i3: number;

    @Column({ type: 'float' })
    v2max_in: number;

    @Column()
    v2max_simp: number;

    @Column()
    v2max_sexp: number;

    @Column()
    v2max_bc: string;

    @Column()
    v3max_fh: Date;

    @Column({ type: 'float' })
    v3max_v1: number;

    @Column({ type: 'float' })
    v3max_v2: number;

    @Column({ type: 'float' })
    v3max_v3: number;

    @Column({ type: 'float' })
    v3max_i1: number;

    @Column({ type: 'float' })
    v3max_i2: number;

    @Column({ type: 'float' })
    v3max_i3: number;

    @Column({ type: 'float' })
    v3max_in: number;

    @Column()
    v3max_simp: number;

    @Column()
    v3max_sexp: number;

    @Column()
    v3max_bc: string;
}
