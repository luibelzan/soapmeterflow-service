import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class T_S04_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh_i: string;

    @Column()
    h_i: string;

    @Column()
    fh_f: string;

    @Column()
    h_f: string;

    @Column()
    ctr: number;

    @Column()
    pt: number;

    @Column()
    mx: number;

    @Column()
    fx: string;
    
    @Column()
    hx: string;

    @Column()
    aia: number;

    @Column()
    aea: number;

    @Column()
    r1a: number;

    @Column()
    r2a: number;

    @Column()
    r3a: number;

    @Column()
    r4a: number;

    @Column()
    aii: number;

    @Column()
    aei: number;

    @Column()
    r1i: number;

    @Column()
    r2i: number;

    @Column()
    r3i: number;

    @Column()
    r4i: number;


}