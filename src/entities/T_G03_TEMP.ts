import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G03_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column()
    avvph1_lv: number;

    @Column()
    avvph2_lv: number;

    @Column()
    avvph3_lv: number;

    @Column({ type: 'float'})
    aviph1_lv: number;

    @Column({ type: 'float'})
    aviph2_lv: number;

    @Column({ type: 'float'})
    aviph3_lv: number;

    @Column()
    avpplus_triph: number;

    @Column()
    avpminus_triph: number;

    @Column()
    avqplus_triph: number;

    @Column()
    avqminus_triph: number;

    @Column()
    avvph1_mv: number;

    @Column()
    avvph2_mv: number;

    @Column()
    avvph3_mv: number;

    @Column({ type: 'float'})
    avineutral: number;

    @Column()
    avv0_comp: number;

    @Column()
    avv1_comp: number;

    @Column()
    avv2_comp: number;

    @Column()
    avvhs: number;

    @Column()
    bc: number;
}
