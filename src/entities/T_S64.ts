import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S64 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    lvs_id: string;

    @Column()
    lvs_pos: number;

    @Column()
    fh: Date;

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