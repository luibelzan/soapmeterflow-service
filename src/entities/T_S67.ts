import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S67 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    et: number;

    @Column()
    c: number;

    @Column({ nullable: true })
    d1: string;
}
