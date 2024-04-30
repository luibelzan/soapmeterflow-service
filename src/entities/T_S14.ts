import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S14 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnc_id: string;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column()
    bc: number;

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

    @Column()
    in: number;

    @Column()
    simp: number;

    @Column()
    sexp: number;
}