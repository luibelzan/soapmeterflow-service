import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class T_G59 {

    @PrimaryColumn()
    rtu_id: string;

    @PrimaryColumn()
    lvs_id: string;

    @PrimaryColumn()
    fh: Date;

    @Column()
    lvs_pos: number;

    @Column({ type: 'float' })
    momCph1: number;

    @Column({ type: 'float' })
    momVph1: number;

    @Column()
    momPimph1: number;

    @Column()
    MomPexph1: number;

    @Column()
    momQimph1: number;

    @Column()
    momQexph1: number;

    @Column({ type: 'float' })
    momPF1: number;

    @Column({ type: 'float' })
    momCph2: number;

    @Column({ type: 'float' })
    momVph2: number;

    @Column()
    momPimph2: number;

    @Column()
    momPexph2: number;

    @Column()
    momQimph2: number;

    @Column()
    momQexph2: number;

    @Column({ type: 'float' })
    momPF2: number;

    @Column({ type: 'float' })
    momCph3: number;

    @Column({ type: 'float' })
    momVph3: number;

    @Column()
    momPimph3: number;

    @Column()
    momPexph3: number;

    @Column()
    momQimph3: number;

    @Column()
    momQexph3: number;

    @Column({ type: 'float' })
    momPF3: number;

    @Column({ type: 'float' })
    momCn: number;

    @Column()
    bc: string;
}
