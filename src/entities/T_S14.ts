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

    @Column()
    v1: number;

    @Column()
    v2: number;

    @Column()
    v3: number;

    @Column()
    i1: number;

    @Column()
    i2: number;

    @Column()
    i3: number;

    @Column()
    in: number;

    @Column()
    simp: number;

    @Column()
    sexp: number;
}