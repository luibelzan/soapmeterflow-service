import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity()
@Unique(["rtu_id", "lvs_id", "fec_inicio", "hor_inicio"])
export class T_S53 {

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
    ai1: number;

    @Column()
    ai2: number;

    @Column()
    ai3: number;

    @Column()
    ae1: number;

    @Column()
    ae2: number;

    @Column()
    ae3: number;

    @Column()
    r11: number;

    @Column()
    r12: number;

    @Column()
    r13: number;

    @Column()
    r21: number;

    @Column()
    r22: number;

    @Column()
    r23: number;

    @Column()
    r31: number;

    @Column()
    r32: number;

    @Column()
    r33: number;

    @Column()
    r41: number;

    @Column()
    r42: number;

    @Column()
    r43: number;

    @Column()
    bc: string;

}