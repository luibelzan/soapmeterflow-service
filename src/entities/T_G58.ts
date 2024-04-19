import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G58 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    lvs_id: string;

    @Column()
    lvs_pos: number;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    mincph1: number;

    @Column({ type: 'float' })
    minvph1: number;

    @Column()
    minpimph1: number;

    @Column()
    minpexph1: number;

    @Column()
    minqimph1: number;

    @Column()
    minqexph1: number;

    @Column({ type: 'float' })
    minpf1: number;

    @Column({ type: 'float' })
    mincph2: number;

    @Column({ type: 'float' })
    minvph2: number;

    @Column()
    minpimph2: number;

    @Column()
    minpexph2: number;

    @Column()
    minqimph2: number;

    @Column()
    minqexph2: number;

    @Column({ type: 'float' })
    minpf2: number;

    @Column({ type: 'float' })
    mincph3: number;

    @Column({ type: 'float' })
    minvph3: number;

    @Column({ type: 'float' })
    minpimph3: number;

    @Column()
    minpexph3: number;

    @Column()
    minqimph3: number;

    @Column()
    minqexph3: number;

    @Column({ type: 'float' })
    minpf3: number;

    @Column({ type: 'float' })
    mimcn: number;

    @Column()
    bc: number;
}