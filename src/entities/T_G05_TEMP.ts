import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G05_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column()
    minvph1_lv: number;

    @Column()
    minvph2_lv: number;

    @Column()
    minvph3_lv: number;

    @Column({ type: 'float' })
    miniph1_lv: number;

    @Column({ type: 'float' })
    miniph2_lv: number;

    @Column({ type: 'float' })
    miniph3_lv: number;

    @Column()
    minpplus_triph: number;

    @Column()
    minpminus_triph: number;

    @Column()
    minqplus_triph: number;

    @Column()
    minqminus_triph: number;

    @Column()
    minvph1_mv: number;

    @Column()
    minvph2_mv: number;

    @Column()
    minvph3_mv: number;

    @Column({ type: 'float' })
    minineutral: number;

    @Column()
    minv0_comp: number;

    @Column()
    minv1_comp: number;

    @Column()
    minv2_comp: number;

    @Column()
    minvhs: number;

    @Column()
    bc: number;
}