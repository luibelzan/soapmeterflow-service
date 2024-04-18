import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G56 {

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
    avgcph1: number;

    @Column({ type: 'float' })
    avgvph1: number;

    @Column()
    avgpimph1: number;

    @Column()
    avgpexph1: number;

    @Column()
    avgqimph1: number

    @Column()
    avgqexph1: number;

    @Column({ type: 'float' })
    avgpf1: number;

    @Column({ type: 'float' })
    avgcph2: number;

    @Column({ type: 'float' })
    avgvph2: number;

    @Column()
    avgpimph2: number;

    @Column()
    avgpexph2: number;

    @Column()
    avgqimph2: number;

    @Column()
    avgqexph2: number;

    @Column({ type: 'float' })
    avgpf2: number;

    @Column({ type: 'float' })
    avgcph3: number;

    @Column({ type: 'float' })
    avgvph3: number;

    @Column()
    avgpimph3: number;

    @Column()
    avgpexph3: number;

    @Column()
    avgqimph3: number;

    @Column()
    avgqexph3: number;

    @Column({ type: 'float' })
    avgpf3: number;

    @Column({ type: 'float' })
    avgcn: number;

    @Column()
    temp: number;

    @Column()
    bc: number;
}