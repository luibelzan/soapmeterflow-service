import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G07_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    unbal: number;

    @Column()
    harm3_ph1: number;

    @Column()
    harm3_ph2: number;

    @Column()
    harm3_ph3: number;

    @Column()
    harm5_ph1: number;

    @Column()
    harm5_ph2: number;

    @Column()
    harm5_ph3: number;

    @Column()
    harm7_ph1: number;

    @Column()
    harm7_ph2: number;

    @Column()
    harm7_ph3: number;

    @Column()
    thd_ph1: number;

    @Column()
    thd_ph2: number;

    @Column()
    thd_ph3: number;

    @Column()
    bc: number;
}
