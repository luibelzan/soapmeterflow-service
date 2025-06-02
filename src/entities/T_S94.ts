import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S94 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    tp: number;

    @Column({ type: 'float' })
    fr: number;

    @Column({ type: 'float' })
    fs: number;

    @Column({ type: 'float' })
    ft: number;

    @Column({ nullable: true })
    bc: string;
}
