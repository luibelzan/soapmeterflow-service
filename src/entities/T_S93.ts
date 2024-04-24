import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S93 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    vr: number;

    @Column({ type: 'float' })
    vs: number;

    @Column({ type: 'float' })
    vt: number;

    @Column()
    bc: number;
}