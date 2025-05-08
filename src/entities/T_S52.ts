import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity()
@Unique(["rtu_id", "lvs_id", "fec_inicio", "hor_inicio"])
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

    @Column({ type: 'date' })
    fec_inicio: string; // Solo fecha

    @Column({ type: 'time' })
    hor_inicio: string; // Solo hora

    @Column({ type: 'date' })
    fec_fin: string; // Solo fecha

    @Column({ type: 'time' })
    hor_fin: string; // Solo hora

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
