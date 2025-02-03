import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()

export class T_G59 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    lvs_id: number;

    @Column()
    lvs_pos: number;

    @Column()
    fh: Date;

    @Column()
    momCph1: number;

    @Column()
    momVph1: number;

    @Column()
    momPimph1: number;

    @Column()
    MomPexph1: number;

    @Column()
    momQimph1: number;

    @Column()
    momQexph1: number;

    @Column()
    momPF1: number;

    @Column()
    momCph2: number;

    @Column()
    momVph2: number;

    @Column()
    momPimph2: number;

    @Column()
    momPexph2: number;

    @Column()
    momQimph2: number;

    @Column()
    momQexph2: number;

    @Column()
    momPF2: number;

    @Column()
    momChph3: number;

    @Column()
    momVph3: number;

    @Column()
    momPimph3: number;

    @Column()
    momPexph3: number;

    @Column()
    momQimph3: number;

    @Column()
    momQexph3: number;

    @Column()
    momPF3: number;

    @Column()
    momCn: number;

    @Column()
    bc: number;

}