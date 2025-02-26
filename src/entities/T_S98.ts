import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S98 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    ift1: number;

    @Column({ type: 'float' })
    ift2: number;

    @Column({ type: 'float' })
    ift3: number;

    @Column({ nullable: true })
    bc: string;
}