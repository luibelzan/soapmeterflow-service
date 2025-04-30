import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G53 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    vtnMin: number;

    @Column({ type: 'float' })
    vtnAvg: number;

    @Column({ type: 'float' })
    vtnMax: number;

    @Column({ type: 'float' })
    vtnLsm: number;

    @Column()
    bc: string;

}
