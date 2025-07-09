import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_S97 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    nr: number;

    @Column()
    ns: number;

    @Column()
    nt: number;

    @Column({ nullable: true })
    bc: number;
}
