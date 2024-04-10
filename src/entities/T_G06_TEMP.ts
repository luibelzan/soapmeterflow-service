import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G06_TEMP {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnt_id: string;

    @Column()
    fh: string;

    @Column()
    h: string;

    @Column()
    momvph1_lv: number;

    @Column()
    momvph2_lv: number;

    @Column()
    momvph3_lv: number;

    @Column()
    momiph1_lv: number;

    @Column()
    momiph2_lv: number;

    @Column()
    momiph3_lv: number;

    @Column()
    mompplus_triph: number;

    @Column()
    mompminus_triph: number;

    @Column()
    momqplus_triph: number;

    @Column()
    momqminus_triph: number;

    @Column()
    momvph1_mv: number;

    @Column()
    momvph2_mv: number;

    @Column()
    momvph3_mv: number;

    @Column()
    momineutral: number;

    @Column()
    momv0_comp: number;

    @Column()
    momv1_comp: number;

    @Column()
    momv2_comp: number;

    @Column()
    momvhs: number;

    @Column()
    bc: number;

}