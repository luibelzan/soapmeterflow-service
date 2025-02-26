import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class T_S95 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rtu_id: string;

    @Column()
    fh: Date;

    @Column({ type: 'float' })
    vu: number;

    @Column()
    pi: string;

    @Column({ nullable: true })
    bc: string;

}