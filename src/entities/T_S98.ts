import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S98 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column({ type: 'float' })
    ift1: number;

    @Column({ type: 'float' })
    ift2: number;

    @Column({ type: 'float' })
    ift3: number;

    @Column({ nullable: true })
    bc: string;
}
