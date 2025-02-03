import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S52 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    lvs_id: string;

    @Column()
    lvs_pos: number;

    @Column()
    lvs_magn: number;

    @Column()
    fh: Date;

    @Column()
    ai: number;

    @Column()
    ae: number;

    @Column()
    r1: number;

    @Column()
    r2: number;

    @Column()
    r3: number;

    @Column()
    r4: number;

    @Column()
    bc: string;
}
