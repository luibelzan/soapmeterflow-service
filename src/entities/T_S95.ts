import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S95 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column({ type: 'float' })
    vu: number;

    @Column()
    pi: string;

    @Column({ nullable: true })
    bc: string;
}
