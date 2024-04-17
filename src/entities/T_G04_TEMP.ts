import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G04_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: Date;

    @Column()
    maxvph1_lv: number;

    @Column()
    maxvph2_lv: number;

    @Column()
    maxvph3_lv: number;

    @Column({ type: 'float'})
    maxiph1_lv: number;

    @Column({ type: 'float'})
    maxiph2_lv: number;

    @Column({ type: 'float'})
    maxiph3_lv: number;

    @Column()
    maxpplus_triph: number;

    @Column()
    maxpminus_triph: number;

    @Column()
    maxqplus_triph: number;

    @Column()
    maxqminus_triph: number;

    @Column()
    maxvph1_mv: number;

    @Column()
    maxvph2_mv: number;

    @Column()
    maxvph3_mv: number;

    @Column({ type: 'float'})
    maxineutral: number;

    @Column()
    maxv0_comp: number;

    @Column()
    maxv1_comp: number;

    @Column()
    maxv2_comp: number;

    @Column()
    maxvhs: number;

    @Column()
    bc: number;
}