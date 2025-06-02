import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S93 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column({ type: 'float' })
    vr: number;

    @Column({ type: 'float' })
    vs: number;

    @Column({ type: 'float' })
    vt: number;

    @Column({ nullable: true })
    bc: string;
}
