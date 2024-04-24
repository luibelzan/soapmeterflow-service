import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_G57 {

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
    maxcph1: number;

    @Column({ type: 'float' })
    maxvph1: number;

    @Column()
    maxpimph1: number;

    @Column()
    maxpexph1: number;

    @Column()
    maxqimph1: number;

    @Column()
    maxqexph1: number;

    @Column({ type: 'float' })
    maxpf1: number;

    @Column({ type: 'float' })
    maxcph2: number;

    @Column({ type: 'float' })
    maxvph2: number;

    @Column()
    maxpimph2: number;

    @Column()
    maxpexph2: number;

    @Column()
    maxqimph2: number;

    @Column()
    maxqexph2: number;

    @Column({ type: 'float' })
    maxpf2: number;

    @Column({ type: 'float' })
    maxcph3: number;

    @Column({ type: 'float' })
    maxvph3: number;

    @Column()
    maxpimph3: number;

    @Column()
    maxpexph3: number;

    @Column()
    maxqimph3: number;

    @Column()
    maxqexph3: number;

    @Column({ type: 'float' })
    maxpf3: number;

    @Column({ type: 'float' })
    maxcn: number;

    @Column()
    bc: number;
}