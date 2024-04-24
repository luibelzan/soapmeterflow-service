import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S06 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnc_id: string;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column()
    ns: string;

    @Column()
    fab: string;

    @Column()
    mod: string;

    @Column()
    af: number;

    @Column()
    te: string;

    @Column()
    vf: string;

    @Column()
    vprime: string;

    @Column()
    pro: string;

    @Column()
    idm: string;

    @Column()
    mac: string;

    @Column()
    tp: string;

    @Column()
    ts: string;

    @Column()
    ip: string;

    @Column()
    is: string;

    @Column()
    usag: number;

    @Column()
    uswell: number;

    @Column()
    per: number;

    @Column({ type: 'float' })
    dctcp: number;

    @Column()
    vr: number;

    @Column()
    ut: number;

    @Column({ type: 'float' })
    usubt: number;

    @Column({ type: 'float' })
    usobt: number;

    @Column({ type: 'float' })
    ucortet: number;

    @Column()
    autmothbill: string;

    @Column()
    scrolldispmode: string;

    @Column()
    scrolldisptime: number;
}