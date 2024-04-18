import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S94 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    tp: number;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    fr: number;

    @Column({ type: 'float' })
    fs: number;

    @Column({ type: 'float' })
    ft: number;

    @Column()
    bc: number;
}